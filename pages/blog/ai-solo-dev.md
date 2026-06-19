# Building a Complete Project Using AI as a Solo Dev

<!--
SEO
title: Building a Complete Project Using AI as a Solo Dev
description: How to ship ambitious solo projects fast without sacrificing code quality — test-first, AI-assisted review, small PRs, and automated CI gates
keywords: ai, solo dev, software engineering, claude, code quality, tdd, ci, productivity
author: Noel Wilson
ogImage: /public/imp_assets/posts/aipet/aipet_part2.png
-->

Right now using AI is a mixture of harnessing lightning and trying to handle a greasy eel. I read a good analogy of it's rocket fuel, it can supercharge your team but if you pour it on a dumpster fire it's just going to explode and make it worse. For my [AI Pet Part 2](/experiments/aipet-part-2) project I built more than I've ever shipped solo: a Babylon.js game engine, a WebSocket multiplayer server, an async inference proxy, Temporal training workflows, remote compute integrations across four platforms, and a Kubernetes deployment on a Raspberry Pi cluster. I built it quickly — and AI coding tools were a central reason why.

But speed without quality is just faster mess. This post is about how I kept the codebase solid while moving fast.

---

## The Shift AI Makes

AI doesn't just speed up writing code — it compresses the feedback loop at every stage. I can describe an architecture, get a working skeleton in minutes, and iterate on real behaviour rather than spending days on scaffolding. A feature that would have taken a week to wire up now takes an afternoon.

The risk is that you move so fast that problems pile up invisibly. Without discipline, you end up with a codebase that works now but that you're afraid to touch next month. The practices below are what I used to prevent that.

---

## Quality Baked In

- **Test-first on every feature** — writing the test before the implementation keeps scope tight and gives the AI a concrete target to hit. The AI is much better at writing code that satisfies a clear spec than at guessing what the right behaviour should be.
- **AI-assisted code review** — after every meaningful change, a review pass catches bugs and design issues I'd miss when moving quickly. It's not a substitute for thinking, but it's a reliable second pair of eyes that doesn't get tired.
- **Small, focused PRs** — keeping changes atomic means the AI can reason about them accurately and I can verify correctness easily. Large PRs are where subtle bugs hide.
- **Automated CI gates** — test runs on every push mean broken code never accumulates; it's caught immediately. This is cheap to set up and pays off constantly.
- **Explicit architecture upfront** — spending 30 minutes planning the shape of a feature with the AI before writing any code avoids the expensive rewrites that come from discovering structural problems late. The AI is a good thinking partner at the design stage, not just the implementation stage.
- Architecture review passes - Cleanup by getting an AI to review the code and identify code smells issues and create better structure periodically, Update your CLAUDE.md point ot architecture and ADR files so future sessions don't forget.
- Consolidate learning - Link / create a consolidate skills that will
wrap up current learning and keep a rolling updated notes for future session

---

## Two steps forward one step back

A pattern I noticed was that I would build quickly then have to validate, fix then rework. This was still quicker than building manually or semi manually.


---

## Async workflow

To avoid waitinf for the AI I would plan to work on 2 or 3 things async so while the AI was working on Feature A I would be debugging or designing feature B. Then would bounce between them, this allowed me to move faster and I like this way of working as I've been good at context switching. I'm not sure this is for everyone though who likes deep focus time.

---

## Remote control

My favourite Claude skill is /remote-control, when I have done pre-planning and have work ready I can setup one or more remote sessions. Then I can go for a walk, go to the gym and answer any questions it has for me on my laptop while I'm away. This has enabled me to work on my projects while staying healthy!

---

## The Compound Effect

The most important thing I noticed: the quality practices compound. Each week I ship more because I'm not paying down debt from the week before. The codebase stays clean enough that I'm not scared to change things — and that confidence frees me to take on more ambitious features.

As a solo dev, I'm also the only person who reads most of this code. AI tooling changes the equation: I now have something that can review, question, and push back on my decisions at any hour. That's a qualitatively different way of working from what solo development looked like before.

If you're a solo dev sitting on an ambitious project you keep putting off because it feels too large — I'd encourage you to try this approach. The tools have genuinely changed what one person can ship.
