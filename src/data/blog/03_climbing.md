---
title: "Climbing Routes Are Graphs"
pubDatetime: 2025-09-30
description: "What do rock climbing routes and graph theory have in common? More than you'd think — discover how bolt sequences form path graphs and what Euler's theorem says about reaching the top."
tags: ["graphs", "climbing", "rock-climbing", "graph-theory", "mathematics"]
series: "Climbing"
ogImage: ../../assets/images/03_climbing/03_cover.png
slug: climbing-routes-are-graphs
---

## Introduction

I understand your confusion. We were supposed to **talk about graphs**, and here I am, **talking about rock climbing and climbing routes instead**. I am a climber. Be it indoors or outdoors, be it rocks or mountains — doesn’t matter too much. But I’m not going to talk about climbing *per se*. Instead, let me show you **where you can find graphs in this sport**.

## From Rock to Graph

It is still (kinda) warm outside, so let’s enjoy the sunshine and inspect this rock below.

![Route “Pesce d'Aprile”, Massone - Sector A, Arco, Italy.](/images/03_climbing/massone.png)

Figure 1: Route “**Pesce d'Aprile”,** Massone - Sector A, Arco, Italy. More show-off photos available on the [Planet Mountain website](https://www.planetmountain.com/en/crags/arco-massone.html).

---

I gave you no other choice but to notice the graph immediately — you can easily spot the red nodes and lime edges.

**The red nodes are where metal bolts are located**. These bolts are part of the climber’s safety system: you clip the rope into them using a climbing quickdraw. In principle, if you accidentally fall, the last bolt clipped into is what you'll be hanging from.

![Climbing security system - bolts, quickdraws, and rope.](/images/03_climbing/quickdraw.png)

**Figure 2: Climbing security system — bolts, quickdraws, and rope.**

---

Bolts are **conceptually connected by the imaginary path** that goes from one bolt to the next. This path gives the climber an idea of where the route goes and guides them on which direction to take next.

When a climber ascends the route, the rope connects each bolt in sequence — and the imaginary graph becomes **traversed**.

In that moment, the graph stops being abstract. You’re not just observing the structure — you're **moving through it, edge by edge**.

## Recap on Graphs

Let’s look back at what we’ve talked about in the [introductory post on graphs](https://hashnode.com/post/cmfm59d42000202kv80md1w67). What can we tell about this graph?

We observe a simple structure: two end nodes have **degree 1**, and all the nodes in between have **degree 2**. It's a textbook example of a **path graph** ([Gross and Yellen, 2003, p.18](https://doi.org/10.1201/9780203490204)). A path graph is a type of tree, and all the nodes and edges can be laid out on a straight line — like the rope a climber takes from the bottom to the top.

Since there are exactly two nodes with odd degree, **there exists an Euler path in this graph** (see the [introductory post on graphs](https://storiesinstructure.com/how-to-solve-a-house-puzzle)!) That's good news, because Euler's theorem proves that **getting to the top is doable!** (Now it is “merely” a matter of one’s skills…)

Finally, is it a **directed graph**? It’s a bit of a philosophical question. Typically, one would go up, in which case — yes. But you can't really prevent anyone from going down if they wish. Unusual? Sure. Impossible? Definitely not.

## Conclusion

When we map a climbing route, we're not just building a graph — we're building a **specific kind** of graph: a **path graph**.

You could say that climbing is about **traversing an abstract graph and turning it into a concrete one** — from its root to its head.

Finally, you've probably noticed that the graphs discussed in this post are **sparse**, with few nodes and few edges. Next time, we'll go to extremes and **strip away all the edges** 😱 We'll explore **point clouds** and how to generate them using **Structure from Motion.**
