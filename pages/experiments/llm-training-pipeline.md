---
title: Building a LLM Training Pipeline
description: Remote training and evaluation across Kaggle, RunPod, VastAI, and Kubernetes — building a durable, platform-agnostic LLM training pipeline with Temporal
keywords: llm, training, pipeline, temporal, kaggle, runpod, vastai, kubernetes, raspberry pi, gguf, fine-tuning
author: Noel Wilson
ogImage: /public/imp_assets/posts/llm_training_pipeline/llm_screen_shot_01.png
---

![Training pipeline](/public/imp_assets/posts/llm_training_pipeline/llm_screen_shot_01.png)

## Building a LLM Training Pipeline

This is part of the [AI Pet Part 2](/experiments/aipet-part-2) series. During testing I quickly realised that raspberry pi's are not the best hardware for training LLMs when they started smoking. (Add cmon do something meme) So instead I used them to orchestrate remote training on multiple platforms, that way I could learn how to train LLMs on bare metal add on remote machines where I can select the right hardware for the job.

I wanted to combine that with logic to load these trained llm weights dynamically so I could use this for my toy project and have a viable pattern for real world usage.

### The goal

Train multiple custom LLMs (cheaply), eval them, save them and load them dynamically to power my AI pet bunny, host it on my own hardware, and swap it into production without downtime.

---

## Remote Training Platforms

The cheapest platforms for training LLMs I found where:
- Kaggle
- RunPod
- VastAI
- My own Kubernetes cluster

I skipped the main cloud providers as they're the most reliable but also the most expensive. If I were to do this for a "real" project I'd probably look at keeping data within the cloud provider I'm using like AWS Sagemaker. LLMs and training require a lot of network bandwidth, one of the largest costs for me was data egress.

### Kaggle

Kaggle provides 30 hours of free training for non commercial use with decent hardware, I started with this as it's very cost effective! The challenge is the API is ok and I had to use it creatively as it's designed to trigger python notebooks and not run containers. I found is the best way to automate training / eval was package my logic in a library and creating a notebook with the library then triggering it.

### Runpod

Runpod had a good balance of cost, consistency and automation potential, this ended up being the fastest / most reliable platform for me. I select a GPU an image and command with params I want it to run and it will spin that up and run it quickly. Only downside is that sometimes it runs out of GPUs and my workflows fail.

### VastAI

VastAI is interesting as it democratises GPUs allowing anyone to rent out their GPU, so it's the cheapest GPU provider and also the most 
unreliable. I almost gave up on using this platform due to the slowness and reliability but got it working well in the end so my opinion on this has definitely improved!

### K3 pod

I want the ability to run all my logic on my own hardware for when I upgrade my local setup, this is currently slow as there's no GPU and limited but wanted to ensure it works!

---

## Temporal Orchestration

I built a training pipeline service using [Temporal](https://temporal.io/) to orchestrate the full workflow — data preparation, fine-tuning, evaluation, GGUF export, and S3 upload — as a durable, retryable process. Temporal failure doesn't lose progress; the workflow just re-tries and re-connects to remote compute automatically.

## Orchestration Management

To manage this process I build the LLM API and UI, with this I can:
- Create new models
- Trigger new training runs
- Monitor the progress
- Promote successful model training to load as inference models.

One non-obvious challenge with remote training is **getting logs back**. Kaggle and RunPod don't give you a stdout pipe — the training process runs inside their environment and you have no direct connection to it. My solution is a background thread in the remote worker that periodically flushes log chunks to S3 with an incremental cursor, and a server-sent events (SSE) endpoint on the API that tails those S3 writes and streams them to the UI in real time.

## Deliberate design && Automated testing

I used AI to build this project, the scope was ambitious and in order to make progress on multiple platforms I needed to do 2 things:

1. Design the project using SOLID principals and hexagonal architecture
2. Create robust Automated tests and E2E tests to validate changes

I'll cover this more in a follow up post but this was essential for quickly verifying new logic and avoiding constant regressions. 

---

## Interesting Problems

Building this pipeline surfaced some genuinely tricky engineering problems:

> **Model size vs. accuracy** — Getting a model accurate enough for simple bunny tasks while quantizing it down small enough to fit in the Pi's RAM required careful evaluation. I trained multiple variants and ran evals against a fixed benchmark — measuring per-stat accuracy, target-object selection, and action distribution — to find the right trade-off. A model that passes 95% accuracy on the eval suite gets promoted; anything below gets discarded and retrained with adjusted hyperparameters.

> **Deadlock in async Python + Temporal** — Temporal activities run inside an async Python event loop, and some operations that look harmless can block it entirely. I hit a deadlock where a database write inside a Temporal activity was blocking the event loop, preventing the activity from completing and causing Temporal to retry it — which made the problem worse. The fix was ensuring all DB operations inside activities use async-compatible sessions rather than synchronous SQLAlchemy calls.

> **Training workflow service reliability** — Building a reliable, observable training orchestration service with Temporal meant designing for partial failures, platform timeouts, and cost limits across RunPod, Kaggle, and VastAI. Each platform has different error surfaces: Kaggle returns 500s when the notebook queue is full; RunPod pods can be preempted mid-training; VastAI instances occasionally fail to bootstrap. Temporal's retry semantics absorb most of this, but you still need activity-level error handling to distinguish a retryable network error from a genuine training failure.

Each of these deserves its own post — I'll be writing them up as I work through them. If you have experience with any of these areas I'd love to hear from you below.

---

## Project Code

The full source for the training pipeline service is available on GitHub: [jwnwilson/llm_training_service](https://github.com/jwnwilson/llm_training_service).
