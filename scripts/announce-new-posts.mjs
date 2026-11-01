// Creates a Buttondown draft email for every newly published blog post.
//
// A post is announced when:
//   - its pubDatetime is on/after ANNOUNCE_AFTER (so old posts are ignored),
//   - it is live in the RSS feed (i.e. deployed, not a draft, not scheduled),
//   - no existing Buttondown email (draft or sent) already links to it.
//
// Requires BUTTONDOWN_API_KEY with "Emails: Read & write" permission.
// Pass --dry-run to only print what would be created.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ANNOUNCE_AFTER = new Date("2026-11-01T00:00:00Z");
const BLOG_DIR = "src/data/blog";
const RSS_URL = "https://storiesinstructure.com/rss.xml";
const API = "https://api.buttondown.com/v1";

const dryRun = process.argv.includes("--dry-run");
const apiKey = process.env.BUTTONDOWN_API_KEY;
if (!apiKey && !dryRun) {
  console.error("BUTTONDOWN_API_KEY is not set");
  process.exit(1);
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^".*"$/.test(value)) value = JSON.parse(value);
    else if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'");
    data[kv[1]] = value;
  }
  return data;
}

function decodeXml(str) {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

async function getLivePosts() {
  // Cache-bust in case the CDN still serves the pre-deploy feed.
  const res = await fetch(`${RSS_URL}?t=${Date.now()}`);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    title: decodeXml(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
    link: decodeXml(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ""),
  }));
  return new Map(items.map(item => [item.title, item.link]));
}

async function api(pathname, options = {}) {
  const res = await fetch(pathname.startsWith("http") ? pathname : `${API}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Buttondown ${options.method ?? "GET"} ${pathname} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function getExistingEmails() {
  const emails = [];
  let next = "/emails";
  while (next) {
    const page = await api(next);
    emails.push(...page.results);
    next = page.next;
  }
  return emails;
}

const files = (await readdir(BLOG_DIR, { recursive: true })).filter(
  f => f.endsWith(".md") && !path.basename(f).startsWith("_")
);
const candidates = [];
for (const file of files) {
  const data = parseFrontmatter(await readFile(path.join(BLOG_DIR, file), "utf8"));
  if (data.draft === "true" || !data.pubDatetime) continue;
  if (new Date(data.pubDatetime) < ANNOUNCE_AFTER) continue;
  candidates.push(data);
}

if (candidates.length === 0) {
  console.log("No posts published after", ANNOUNCE_AFTER.toISOString());
  process.exit(0);
}

const livePosts = await getLivePosts();
const existingEmails = dryRun ? [] : await getExistingEmails();

for (const post of candidates) {
  const link = livePosts.get(post.title);
  if (!link) {
    console.log(`Skipping "${post.title}": not in the live RSS feed yet`);
    continue;
  }
  if (existingEmails.some(email => email.body?.includes(link) || email.subject === post.title)) {
    console.log(`Skipping "${post.title}": already has a Buttondown email`);
    continue;
  }

  const body = [
    post.subtitle && `*${post.subtitle}*`,
    post.description,
    `[Read the full post →](${link})`,
  ]
    .filter(Boolean)
    .join("\n\n");

  if (dryRun) {
    console.log(`Would create draft "${post.title}":\n${body}\n`);
    continue;
  }
  await api("/emails", {
    method: "POST",
    body: JSON.stringify({ subject: post.title, body, status: "draft" }),
  });
  console.log(`Created draft for "${post.title}"`);
}
