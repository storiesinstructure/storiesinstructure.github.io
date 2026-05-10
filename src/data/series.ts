export type SeriesMeta = {
  description: string;
  image?: string;
  order?: number;
};

export const SERIES_META: Record<string, SeriesMeta> = {
  "Graphs & Graph Neural Networks (GNNs)": {
    description: "A series exploring the power of graphs as a way to represent and understand structure. From basic graph theory and routing algorithms to modern applications like graph neural networks.",
    image: "",
  },
  "3D Reconstruction": {
    description: "From Structure from Motion to LIDAR and beyond — this series explores how we rebuild the shape of the world from photos, lasers, or drones.",
    image: "",
  },
  "Positioning & Navigation": {
    description: "How do we know where we are? This series dives into satellite-based positioning systems (like GPS, Galileo, etc.), GNSS data collection, RTK corrections, and what “position” really means — from phones to tractors.",
    image: "",
  },
  "Climbing": {
    description: "Rock climbing meets graphs. This series looks at climbing routes as graph structures, the challenges of tracking elevation with sensors, and what it means to move through a structure, edge by edge.",
    image: "",
  },
  "Visual Attention & Perception": {
    description: "What catches our eye — and why? This series explores visual saliency, bottom-up vs. top-down attention, task-driven gaze patterns, and how eye trackers help us model what humans actually see and notice.",
    image: "",
  },
  "Graphs × GenAI": {
    description: "A series exploring how structured representations — especially graphs — interact with modern generative AI systems.",
    image: "",
  },
};
