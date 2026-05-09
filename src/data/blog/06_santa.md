---
title: "Mapping the Skies"
subtitle: "How Santa Claus navigates straight to your chimney"
pubDatetime: 2025-12-30
description: "How Santa Claus navigates from Lapland to your chimney — and why European airspace is a directed graph of waypoints, airways, and flight levels."
tags: ["graphs", "geospatial", "flight-planning", "airspace", "graph-theory", "aviation", "systems-thinking", "navigation", "santa-claus"]
series: "GNSS & Positioning"
ogImage: ../../assets/images/06_santa/06_santa_cover.png
slug: mapping-the-skies
---

## How Santa Claus navigates straight to your chimney

Christmas has passed, and I truly hope you got your presents — hopefully more elaborate than an annual supply of socks.

Now that your presents are here (socks or not), join me for a moment to ponder the **logistics of Santa Claus**.

**So how does Santa deliver your presents straight to your chimney?**

## Santa's Base → Your Chimney

For Santa to get to your house, **three things** are required: a starting point, an ending point, and a route between the two. Does that already sound like **traversing a graph**?

### Starting Point

As a European child, I was made to believe that Santa Claus lives in [Lapland](https://en.wikipedia.org/wiki/Lapland_\(Finland\)), in northern Finland. For the sake of argument, let's stick to this childhood belief and assume Santa's base is in Rovaniemi — his ["official" hometown](https://www.lapland.fi/visit/only-in-lapland/lapland-home-santa-claus-village/).

![Location of Rovaniemi on the map of Europe](/images/06_santa/rovaniemi_map.png)

*Figure 1: Location of Rovaniemi. © OpenStreetMap contributors.*

---

### Ending Point

The second assumption we have to make is that you actually are in possession of a chimney. If you are not, then... well — how about considering the closest chimney as your own?

### Why Europe?

The third assumption is that this **chimney is located in Europe**. Not because Santa prefers Europe, but because **Europe makes the structure of the sky explicit**. Relatively small countries fragment airspace into national volumes, and dense traffic requires cross-border coordination. As a consequence, local authorities publish their maps and regulations, making the system easier to explore — even for laypeople like us.

Europe is not special — each major world region implements the same global framework, only differently. Regardless of the implementation, Santa’s problem remains unchanged: **finding a safe path through a constrained, shared, three-dimensional space.**

### Visual vs Instrument-Based Navigation

Finally, we have to decide whether Santa flies using **visual cues** — such as terrain, landmarks, aerodromes, lights, and light patterns — or relies on **instruments** that provide attitude, speed, altitude, navigation, communication, and system awareness. In aviation, these two navigation modes are formally codified as **Visual Flight Rules (VFR)** and **Instrument Flight Rules (IFR)**.

**Can Santa and his reindeer operate in both navigation modes?**

Personally, I would be disappointed if they had not mastered both, given their many centuries of experience in present delivery.

**Which navigation mode would be more reasonable to choose?**

Flying using visual cues is a little like going off-road: it feels like freedom, but it does not scale well under time pressure, poor weather, or long distances. Flying on instruments, on the other hand, enables predictable routing through **structured airspace**, with defined coordination and separation.

Given that:

* there were **172,901 flights worldwide** on Christmas Eve 2025 (see Figure 2),
* Christmas presents are of utmost priority,    
* and so is Santa’s safety,
    

it is reasonable to assume that **Santa relies on instruments and structured airspace whenever possible**.

[![Flightradar24 Statistics](/images/06_santa/total_flights_flightradar24_2025_800.png)](https://www.flightradar24.com/data/statistics)

*Figure 2: Total number of flights per day in 2025, based on statistics published by [Flightradar24](https://www.flightradar24.com/data/statistics).*

---



## European airspace as a graph

We set forth the assumptions. We established the starting point, the ending point, and that it is plausible that Santa Claus operates in structured airspace under IFR.

To deliver presents to your chimney, **Santa needs a route**. And to determine that route, **he needs to understand the underlying structure — the airspace graph**. So let's explore it!

### Nodes: Waypoints

Santa likely departs under local Air Traffic Control and then joins the airspace route network at a nearby waypoint. Looking at the chart below, you can spot *ULROM* waypoint nearby the Rovaniemi airport. This could be such first waypoint for Santa when heading south.

Waypoints are abstract nodes defined by coordinates (latitude and longitude) and identified by globally unique five-letter codes.

**These waypoints are nodes in the airspace graph.**

![Rovaniemi area en-route chart](/images/06_santa/Raveniemi_800.png)

*Figure 3: Rovaniemi enroute chart (excerpt). Source: Finavia / ANS Finland, [eAIP Finland, ENR 6.1](https://www.ais.fi/eaip/), accessed 22.12.2025.*

### Edges: Airways

Looking again at the Rovaniemi enroute chart above, you'll notice that some waypoints are connected. Look at the blue line that goes from *OSLIT* to *ULROM*, and then from *ULROM* to *RENVI*. This blue line, named *Y86*, is a defined airway. Moreover, it has a defined direction (denoted with arrows).

While there are only two defined airways in the vicinity of Rovaniemi, investigating Helsinki area uncovers a different story.

![Helsinki area en-route chart](/images/06_santa/Helsinki_800.png)

*Figure 4: Helsinki area enroute chart (excerpt). Source: Finavia / ANS Finland, [eAIP Finland, ENR 6.1](https://www.ais.fi/eaip/), accessed 22.12.2025.*

---

There are many more defined (blue) airways in both inwards and outwards directions. These defined airways are **one type of edges in the airspace graph**.

Did I just say **one type**? Does that mean that there are **other types**?

### Edges: Direct connections

To answer this question, let's zoom out even more and look at the entirety of Europe. What we can see here are those defined airways (shown as black lines) that are the **explicit part of the airspace graph**.

![Simplified map of the European air route network showing major routes and nodes](/images/06_santa/eurocontrol-ern-high-27november2025-layered_800.png)

*Figure 5: Simplified view of the European route network. Adapted from the [EUROCONTROL Route Network Chart (ERN), edition 27 November 2025](https://www.eurocontrol.int/publication/eurocontrol-route-network-chart-ern-27-november-2025). © EUROCONTROL.*

---

But an aircraft does not always have to follow these fixed corridors.

Have you noticed **curious blank spaces**, for instance in France or in the Balkan area? These are the areas with no fixed corridors at all! Then how is it possible to navigate to a chimney in Rome?

What we are dealing with here is **Free Route Airspace (FRA)**, where aircraft may fly direct between permitted waypoints while still using predefined airways where available. Green lines in the above chart depict the boundaries of FRAs, and you can easily see that free routing is possible across much of Europe.

So even though we don't get these direct edges explicitly in the charts, they are there. **These implicit direct connections constitute the second type of edges in the airspace graph.**

## Third Dimension: Flight Levels

So far, the airspace has been described as if it were flat — defined only by latitude and longitude. In reality, aircraft also move vertically, and this vertical dimension is structured using **flight levels**.

A flight level is a standardized altitude reference, expressed in hundreds of feet and based on a common pressure datum. Instead of thinking in absolute altitude above sea level, aircraft operate on these shared vertical layers, allowing multiple flows of traffic to safely occupy the same geographic space.

In graph terms, **flight levels extend waypoints and routes into the third dimension**. The same horizontal path may exist simultaneously at multiple vertical layers, with separation enforced by assigning different flight levels to different aircraft.

![Comparison of flight levels](/images/06_santa/Comparison_flight_levels.svg.png)

*Figure 6: Comparison of assorted flight level systems to scale by CMG Lee - Own work, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), [Link](https://commons.wikimedia.org/w/index.php?curid=121718377).*

---



## How Santa integrates with structure

What remains to be done by Santa and his crew, is to **construct a flight plan**. This flight plan is exactly the **path** that Santa has to take to **traverse a graph from the starting point to the ending point** -- **a sequence of named waypoints connected by a mix of predefined airways and direct segments.**

In the example flight plan below, Santa departs from his base in Rovaniemi, joins the airspace structure in *ULROM* at flight level 280 (28,000 ft), briefly follows a published airway *Y86* while climbing to FL320 by *RENVI*, then transitions into free-route airspace. From there, Santa completes the climb to FL340 by *LUNIP* and continues across Europe on a series of direct segments between waypoints, remaining at cruise altitude until leaving the en-route phase at *GERVA* to deliver presents to a chimney close to Rome.

```bash
F280 ULROM Y86 RENVI/F320 DCT LUNIP/F340 DCT VABER DCT NINTU DCT TUMGU DCT GERVA
```

This flight plan is for illustration purposes only (and is missing cruising speed). Real-world routes are validated against current airspace availability, restrictions, and traffic flows.

Nevertheless, once a flight plan is sent and approved, Santa and his reindeer can roam the airspace with no harm neither to the crew nor to the cargo.

## Conclusion

The key take-away message from this post is that **airspace** is a **directed graph** with **waypoints as nodes**, **airways** (both explicit and implicit) **as edges**, and with **flight levels that extend these nodes and edges into the third dimension**.

Even if Santa Claus does not exist.

![Illustration of a person in Christmas socks sitting by a fireplace.](/images/06_santa/socks.png)

*Figure 7: The hazards of chimney-based logistics. (Image generated with OpenAI’s DALL·E via ChatGPT.)*

## Notes

* Waypoints, along with their details, are listed in Chapter ENR 4.4 of the country’s electronic Aeronautical Information Publication -- eAIP, such as this [eAIP for Finland](https://www.ais.fi/eaip/).
* In addition to abstract waypoints, there are also legacy nodes based on physical radio infrastructure. Those radio navigation aids are listed in Chapter ENR 4.2 of eAIP and are denoted with 2- and 3-letter codes.
