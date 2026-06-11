<!--
Working draft for: pages/experiments/aipet-part-2.tsx
Edit the prose here, then port changes back into the <Text>/<List>/<Image> JSX.
Image paths are kept as-is so they map 1:1 to the page.
-->

# AI Pet - Part 2

![AI Pet Part 2](/public/imp_assets/posts/aipet/screenshot_02.png)
_[Click here to check out the latest version.](https://pet-simulator.co.uk/)_

I've deployed [pet-simulator](https://pet-simulator.co.uk/) which is a multiplayer 3D browser game built on [Babylon.js](https://www.babylonjs.com/) and [Colyseus](https://colyseus.io/), running on a self-hosted [Raspberry Pi Kubernetes cluster](/experiments/kubernetes-cluster). It picks up where [part 1](/experiments/aipet-part-1) left off, a single-player prototype, and turns it into a shared experience powered by an AI brain.

**Features:**

- A live 3D scene where multiple players can join and interact with the same bunny simultaneously
- An AI bunny whose behaviour is driven by an LLM hosted on my own hardware
- Improved visuals with better sprites and animations
- A custom-trained model that can be hot-swapped into production without downtime
- Full self-hosting — game server, inference worker, and database all run on the Raspberry Pi cluster

---

## Hardware

![Hardware setup](/public/imp_assets/posts/aipet/rasp_cluster_02.png)

I've updated the hardware slightly, with plans to add more later. I've wired up the network — previously it ran wirelessly, but my router was struggling with the wireless traffic. I've also added a 16GB Raspberry Pi node, tagged to run inference; it gives respectable performance running tiny models on CPU.

---

## High Level Design

![High level design diagram](/public/imp_assets/posts/aipet/AI%20Pet%20Design%205.png)

The v1 of aipet was just a single web server and database making API requests to Google Gemini. Supporting multiplayer and self-hosted inference meant adding several more components.

**Requirements:**

- A multiplayer game server that is low latency
- The game state is stored on the server and shared with all clients
- The game server can access an LLM and use the output to drive the bunny's behaviour
- The LLM container can load different weight files and be changed dynamically without downtime

The backend splits across two languages, each chosen for its strengths: a TypeScript game server for real-time multiplayer, and Python services for the LLM proxy and model inference. The game server can share code between the client and server, greatly simplifying game development. The Python LLM proxy and inference services can use the LLM libraries that I am most familiar with.

The game client is a Babylon.js app that runs in the browser and connects to the game server over WebSockets. It renders the scene, sends player input to the server, and receives scene updates to keep everything in sync.

The game server is a TypeScript Express app that owns the game state, player connections, and the game loop. When the bunny needs to act, it calls the Python LLM service over internal DNS that never leaves the private network.

The LLM service is a Python proxy running in its own container. Using a ports & adapters pattern, it either calls OpenRouter for third-party models or a locally hosted inference instance reachable only inside the private network.

---

## The Game Engine

![Game engine architecture](/public/imp_assets/posts/aipet/aipet_part2_engine.png)

To get this up to speed I started from the [T5C template](https://github.com/orion3dgames/t5c), which pairs Babylon.js and Colyseus. Babylon.js is a powerful 3D game engine that runs in the browser, and Colyseus is a multiplayer framework that handles real-time communication and state synchronization between clients and the server. I wanted a solid base with good design patterns for the AI to enhance rather than risk it creating a mess, especially as multiplayer is a hard problem with lots of edge cases.

Colyseus runs the authoritative game state: each WebSocket connection streams player input in, and the server fans the resulting scene updates — including the bunny's AI-driven moves — back out to every connected client.

- **Game client** — a static React/Babylon.js bundle served from AWS S3 + CloudFront
- **Game server** — a persistent TypeScript WebSocket server running on my Raspberry Pi cluster, managing scene state and player connections

---

## The LLM Proxy and Inference

![LLM proxy and inference architecture](/public/imp_assets/posts/aipet/aipet_part2_hosting.png)

The LLM management is split into two components:

- **Proxy API** — a lightweight Python FastAPI service handling auth, routing, and the database. No ML dependencies, so it runs cheaply alongside the game server
- **Inference worker** — a separate, heavier Docker container running async llama-cpp-python (inference is I/O-bound, so async beats threading for throughput). Runs as a Kubernetes pod, spun up on demand and shut down when idle. It loads weights from a GGUF file stored in S3.

Note: the LLM training is handled separately and will be covered in a follow-up post.

Splitting the proxy and inference into separate containers keeps the proxy API performant and makes memory / CPU management in the cluster easier. The proxy and inference services run on different nodes in the cluster — I've added a larger Raspberry Pi and tagged it specifically for inference. The inference node has 16GB of RAM, so it can fit two LLM pods. This lets me load a new inference model for the game, handle routing seamlessly, and shut down the old inference pod.

The model is currently **HuggingFaceTB/SmolLM2-360M**, which is optimised for speed; I can get full responses from inference in 2-3 seconds. I also tried **HuggingFaceTB/SmolLM2-1.7B**, but inference time rose to 10-15 seconds. The problem of deciding the pet's needs is simple enough right now that a tiny model is good enough, and the bunny's dialogue is simple too, so a tiny model can handle it comfortably.

Now my training service is up, I can easily try more models, which I'll cover in a follow-up post.

---

## Repository

Here's the project if you'd like to see the code: [github.com/jwnwilson/aipet](https://github.com/jwnwilson/aipet)

---

## Interesting Problems

![Interesting technical problems](/public/imp_assets/posts/aipet/aipet_part2_problems.png)

This project has thrown up some genuinely difficult engineering problems. The training and workflow challenges are covered in the [LLM Training Pipeline](/experiments/llm-training-pipeline) post — the ones below are specific to the game and hosting layer:

> **Hot-swap model loading in 8 GB RAM** — Only one GGUF can be in memory at a time. Promoting a new model means calling `release()` on the current adapter to free the RAM, then loading the replacement. If the release fails or the new model doesn't load cleanly, the inference service goes down. I spent time making the handover atomic and adding fallback logic so a failed promotion reverts to the previous model rather than leaving the bunny brain-dead.

> **Resource contention** — The game server and LLM inference compete for the same CPU and memory on the cluster. The idle shutdown (2-hour timeout based on `last_used_at`) helps significantly — the inference pod is only alive when someone is actually playing. When it is alive, Kubernetes resource limits prevent the inference worker from starving the game server during a heavy inference tick.

> **Hardware voltage issues** — At peak load, voltage drops across the cluster caused the master node to become unstable. Combined with the volume of Prometheus metrics flowing through it, the master node couldn't keep up — leading to dropped metrics and unreliable scheduling decisions. Moving the monitoring stack off the master and onto worker nodes solved the instability, but diagnosing it took a while since the symptoms looked like software bugs.

Each of these deserves its own post — I'll be writing them up as I work through them. If you have experience with any of these areas I'd love to hear from you below.

---

## Related Posts

- [Building a LLM Training Pipeline](/experiments/llm-training-pipeline) — remote training across Kaggle, RunPod, VastAI, and Kubernetes with Temporal
- [Building a Complete Project Using AI as a Solo Dev](/blog/ai-solo-dev) — how to ship fast without sacrificing quality
