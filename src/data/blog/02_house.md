---
title: "How to Solve the House Puzzle"
subtitle: An Unexpected Intro to Graphs
pubDatetime: 2025-09-16T09:00:00Z
description: "An unexpected intro to graphs — using the classic house-drawing puzzle to explain nodes, edges, node degree, and Eulerian paths."
tags: ["graphs-and-gnns", "graph-theory", "computer-science", "puzzles", "graphs", "mathematics"]
series: "Graphs & Graph Neural Networks (GNNs)"
ogImage: ../../assets/images/02_house/02_cover_how_to_solve_the_house_puzzle.png
slug: how-to-solve-the-house-puzzle
---

**Let’s play a game.** Your task is to **draw a house by connecting the dots without lifting your pen** (or pencil, or mouse). You can visit a dot multiple times, but you are allowed to draw an edge **only once**!

![](/images/02_house/house.png)

Depending on which dot you choose as your starting point — you’ll either succeed or fail. **But why?**

![Animation of successful and unsuccessful house drawing](/images/02_house/graph_drawing.gif)

What we’re doing here is **traversing a graph**. This is our **house graph**:

![The house graph](/images/02_house/house_graph.png)

A **graph** is a structure made of **nodes** (also called *vertices*) and **links** (or *edges*), with each link connecting a pair of nodes. In this case, we have five nodes: A, B, C, D, and E, and 8 edges: A-B, A-D, A-E, B-C, B-D, B-E, C-D, D-E.

What’s more, the house graph is an **undirected graph**, meaning you can traverse each link in either direction — from A to B or B to A.

Now, back to the question: **why does starting from node A let you draw the house in one go, but starting from B doesn’t?**

To answer this, we need to look at something called **node degree** — the number of links connected to each node in an undirected graph.

![The house graph with node degrees](/images/02_house/house_graph_node_degree.png)

Back in 1735, **Leonhard Euler** showed that in order to traverse such a graph in a single go — without retracing steps — you must start at a node with an **odd degree** and end at another node with an **odd degree**. All other nodes must have an **even degree**. He actually proved it [here](https://scholarlycommons.pacific.edu/euler-works/53).

Since there are exactly two nodes with an odd degree (A and E) and all other nodes (B, C, and D) have even degrees:

* There **is** an Eulerian path in the house graph, meaning it is possible to draw all edges in one go.  
* You must either **start drawing from A and end at E**, or **start at E and end at A**.
    

## Check your knowledge: **Bridges of Königsberg**

To test your understanding, try this rule on the famous **Bridges of Königsberg**. This is the problem that led Euler to formulate the rule in the first place. His question:

\&gt; ***Can you walk through the city, crossing each bridge exactly once?***

![Bridges of Königsberg. Image by Bogdan Giuşcă - Public domain (PD), CC BY-SA 3.0.](/images/02_house/Konigsberg_bridges.png)

When we translate the city into a graph, pieces of land become nodes and bridges become edges, like so:

![Bridges of Königsberg with named nodes (pieces of land)](/images/02_house/Konigsberg_bridges_nodes.png)

**Let me know in the comments what the node degrees are, and whether you found the solution to Euler’s question!**

## Summary

That was the shortest intro to graphs I could come up with :)

We've touched on:

* **Nodes** (vertices)  
* **Edges** (links)
* **Undirected graphs**, where movement is allowed in both directions
* **Node degree**, and how it affects traversal
* Euler's recipe for drawing a graph in a single stroke — the **Eulerian path**.
