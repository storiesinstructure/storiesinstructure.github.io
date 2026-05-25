---
title: "Geometry of Evidence: A DIY 3D Reconstruction"
pubDatetime: 2025-10-28
description: "Learn how to reconstruct 3D geometry from photos using Structure-from-Motion and Meshroom. A practical continuation of Geometry of Evidence."
tags: ["computer-vision", "3d-reconstruction", "structure-from-motion", "photogrammetry", "diy"]
series: "3D Reconstruction"
ogImage: ../../assets/images/04_sfm/04_cover_geometry_of_evidence_diy.png
slug: geometry-of-evidence-diy
---

In my previous post — [Geometry of Evidence](https://storiesinstructure.com/geometry-of-evidence) — we followed how investigative journalists and algorithms reconstruct truth from fragments. This time, let’s do it ourselves.

In this short guide, you’ll run a **Structure-from-Motion** pipeline using [Meshroom](https://github.com/alicevision/meshroom/releases), a free and open-source photogrammetry tool that recreates 3D geometry from photographs.

On our agenda:

* [Run a Structure-from-Motion pipeline step by step.](#diy)
* [Troubleshoot common issues](#it-doesnt-work-) (like the “white mesh” bug).
* [Explore further resources and projects that shaped photogrammetry](#further-exploration).


## DIY

### Software

My preferred software for photogrammetry is [Meshroom](https://github.com/alicevision/meshroom/releases). It performs the entire pipeline and is free and open source.  

(You can find links to other software and related tutorials in the [resources section](#further-exploration).)

### Steps

**What you'll need:** a computer with a decent GPU and at least 10 GB of free disk space.

1. Download [Meshroom](https://github.com/alicevision/meshroom/releases) for your operating system.  
2. Download the photo set of *The Waiting* sculpture (≈ 610 MB).

    [Link to Google Drive](https://drive.google.com/uc?export=download&id=15DXp-VQlkurkFg5jUrQbuVZwmZGB3kjj)

    Unzip it into a folder — you’ll load this into Meshroom in step 5.
3. Start Meshroom and select **Photogrammetry** from the available pipelines.  

![Select Photogrammetry from available pipelines](/images/04_sfm/pipeline_selection.png)

4. **Save** the project.  
5. **Drag and drop** the folder of images.  
6. Hit **Run** and grab yourself a drink. It will take a moment for the pipeline to complete. 
   
    Observe the colours of the pipeline’s steps — green = success, orange = in progress, blue = awaiting, red = error.  

![Photogrammetry pipeline execution](/images/04_sfm/new_project.png)

7. Once the pipeline completes successfully, you will see the sparse cloud.  
8. To view the **mesh**, double-click the *Meshing* component. It will appear in the *Scene* menu on the right-hand side, where you can toggle it on and off. If the mesh is white or not visible, head to the [It Doesn’t Work 😱](#it-doesnt-work-) section.
9. To view the **textured mesh**, double-click the *Textured Mesh* component. It will also appear in the *Scene* menu. If the mesh is white or not visible, head to the [It Doesn’t Work 😱](#it-doesnt-work-) section.  
10. To view the **dense point cloud**, go to the *Meshing* component, scroll down to *Dense Point Cloud*, and double-click it. It will appear in the *Scene* menu on the right-hand side, where you can toggle it on and off.  

![Dense point cloud](/images/04_sfm/meshing_dense_pointcloud.png)

## It Doesn’t Work 😱

❗ Unfortunately, the current release has a bug — the meshes sometimes appear completely white. The meshes are fine, but we’ll need different software to render them.    

If your meshes are white or do not show up:

1. Install [MeshLab](https://www.meshlab.net/#download). 
2. In Meshroom, click the *Meshing* step and copy the path to your mesh.  

![Settings of Meshing](/images/04_sfm/meshing.png)

3. In MeshLab, go to *File* → *Import Mesh*, and paste the path you just copied from Meshroom.  

![MeshLab mesh import](/images/04_sfm/meshlab_mesh_import.png)

4. In Meshroom, click the *Texturing* step and change the *File Type* to **PNG**. Copy the path to your *Mesh*.  

![Settings of Texturing](/images/04_sfm/textured_mesh_filetype.png)

5. Recompute the *Texturing* step.  
6. Once it completes, go back to MeshLab, choose *File* → *Import Mesh*, and paste the path you just copied.  

## Further Exploration

If you’ve made it this far — congratulations, you’ve built your first reconstruction.

If you’d like to go deeper, below are a few excellent resources worth exploring.

### Computer Vision Theory

* Szeliski, Richard. *Computer Vision: Algorithms and Applications.* Springer Nature, 2022. [Free download](https://szeliski.org/Book). See Section 11.4: Multi-frame Structure from Motion.  
* A 4-minute [video explaining the problem solved by Structure-from-Motion](https://www.youtube.com/watch?v=JlOzyyhk1v0&list=PL2zRqk16wsdoYzrWStffqBAoUY8XdvatV&index=8) (from *First Principles of Computer Vision*).  
* [Lecture on Structure-from-Motion](https://www.youtube.com/watch?v=MUadR35FFqk) — deriving a sparse point cloud and calibrated cameras (CVRP Lab, NUS).  
* [Lecture on Multi-View Stereo](https://www.youtube.com/watch?v=OpZs7kfjFPA) — algorithms that estimate pixel-wise depth to densify the point cloud (CVRP Lab, NUS).  
* Two classic surface-reconstruction algorithms: [Poisson Surface Reconstruction](https://hhoppe.com/poissonrecon.pdf) and the [Ball-Pivoting Algorithm](http://mesh.brown.edu/taubin/pdfs/bernardini-etal-tvcg99.pdf).  

### Projects that Changed the Landscape

* [**Building Rome in a Day**](https://cacm.acm.org/research/building-rome-in-a-day) — a University of Washington project that showed it was possible to reconstruct an entire city from thousands of publicly shared tourist photos.  

### Between Lectures and Tutorials

* Excellent [video on Topographic Point Clouds and Structure from Motion](https://www.youtube.com/watch?v=iJTqlb7gsWY&list=PLYqCeHIaz7Pi2jpqsROsk064vmOsMPz9v) by Ramon Arrowsmith ([OpenTopography](https://www.opentopography.org)).  

### Software Tutorials and Documentation

* [AliceVision Photogrammetry Pipeline](https://alicevision.org/#photogrammetry) — documentation describing each step and the algorithms behind it.  
* [Faraglione with Agisoft Metashape](https://www.youtube.com/watch?v=tCsnhsvGRio&list=PLYqCeHIaz7Pi2jpqsROsk064vmOsMPz9v) (by Chelsea Scott) — introduces [a drone photo dataset from Vulcano Island, Italy](https://portal.opentopography.org/dataspace/dataset?opentopoID=OTDS.102018.32633.1) you can also process in Meshroom.  
* [RealityScan](https://www.realityscan.com/en-US/uses) (formerly RealityCapture) — now free for individuals earning under $1 million USD per year. What’s remarkable about RealityScan is that it connects directly to the **Unreal Engine** ecosystem, letting you bring your 3D scans straight into interactive environments and games. 
  * [RealityCapture to Unreal Engine: Beginner’s Guide](https://dev.epicgames.com/community/learning/tutorials/W4MR/realityscan-realitycapture-to-unreal-engine-beginner-s-guide-to-photogrammetry-workflow)  
  * [Crafting 3D Models with RealityCapture – Unreal Fest Prague 2024](https://dev.epicgames.com/community/learning/talks-and-demos/PYBZ/realityscan-mastering-photogrammetry-crafting-3d-models-with-realitycapture-unreal-fest-2024)

## Next Investigation

Every reconstruction is a small investigation — a way of recovering structure and understanding how things connect.

Next time, we'll put our own **brain** under scrutiny: we'll follow our eyesight and observe how picky, and how seemingly disordered, it is. 

In other words, we'll look into the mechanisms of **visual attention**. 