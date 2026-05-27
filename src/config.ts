export const SITE = {
  website: "https://storiesinstructure.com",
  author: "Agata Migalska",
  profile: "https://storiesinstructure.com",
  desc: "Exploring the structure hidden in the world around us - from sensor data modelled as graphs, to 3D reconstruction, visual attention, and reasoning over graphs with AI. Whether it's visible or abstract, if it has structure, it has a story.",
  title: "Stories in Structure",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/storiesinstructure/storiesinstructure.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Warsaw", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
