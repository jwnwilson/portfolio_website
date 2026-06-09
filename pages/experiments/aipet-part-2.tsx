/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";

const Article = () => {
    const { theme } = useTheme();
    return (
        <PageLayout standard PAGE_SEO={
            {
                title: "AI Pet - Part 2",
                description: "Building a self-hosted LLM multiplayer AI pet game with a Raspberry Pi cluster",
                keywords: "ai pet, ai, llm, self-hosted, raspberry pi, babylon.js, multiplayer, temporal, kubernetes",
                author: "Noel Wilson",
                ogImage: "/public/imp_assets/posts/aipet/aipet_part2.png"
            }
        }>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                <div className="flex flex-col">
                    <Image src="/public/imp_assets/posts/aipet/aipet_part2.png" alt="AI Pet Part 2" size={ImageSize.MEDIUM} />
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            AI Pet - Part 2
                        </Text>
                        <Text p>
                            In <LinkTo href="/experiments/aipet-part-1" className="underline">part 1</LinkTo> I built an AI pet bunny controlled by a 3rd party LLM in a 3D scene.
                            In my <LinkTo href="/experiments/kubernetes-cluster" className="underline">Kubernetes cluster post</LinkTo> I built a self-hosted Raspberry Pi cluster capable of running real workloads.
                            Here is where those two projects including the following:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Upgrading the aipet to use a game engine with multiplayer</li>
                                <li>Deploying the game server onto my own hardware</li>
                                <li>Training a custom LLM to power it</li>
                                <li>Deploying and self hosting the LLM to power my aipet</li>
                            </ul>
                        </Text>
                        <Text p>
                            This will enable my ultimate goal:
                        </Text>
                        <Text p>
                            A self-hosted AI pet controlled by LLMs, trained remotely then hosted on my own hardware, interacting with multiple players.
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    Next Goals
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_goals.png" alt="Next goals diagram" size={ImageSize.MEDIUM} />
                <Text p>
                    The two biggest improvements I want to make are running the LLM locally and enabling multiplayer. Right now the bunny is powered by Google Gemini — a hosted API call on every tick.
                    I want to replace that with a model I train and host myself on my Raspberry Pi cluster, so the behaviour is fully under my control and not subject to rate limits or API costs.
                </Text>
                <Text p>
                    Importantly, I don't want the game to go offline while I'm training and validating the local model. The solution is an inference proxy that routes to <LinkTo href="https://openrouter.ai/" external className="underline">OpenRouter</LinkTo> (cloud LLMs) while the local model is being built.
                    Once a trained model passes quality evaluation, the proxy hot-swaps to the Pi-hosted GGUF — no downtime, no game interruption. The bunny just gets smarter.
                </Text>
                <List type={ListType.disc}>
                    <li>Self-hosted LLM powering the bunny's behaviour instead of a cloud API</li>
                    <li>Multiplayer — multiple users in the same scene talking to and interacting with the bunny simultaneously</li>
                    <li>Richer bunny actions and longer-term memory driven by a multi-agent approach</li>
                    <li>Inference proxy pattern — route to OpenRouter while training, swap to local model when ready</li>
                    <li>Remote training and evaluation across multiple platforms (Kaggle, RunPod, VastAI, K8s) to understand what each offers and build a system flexible enough to use all of them</li>
                </List>

                <Seperator />

                <Text p subtitle>
                    The Game Engine
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_engine.png" alt="Game engine architecture" size={ImageSize.MEDIUM} />
                <Text p>
                    The game is built on <LinkTo href="https://www.babylonjs.com/" external className="underline">Babylon.js</LinkTo>, which already handles the 3D rendering.
                    To support multiplayer, I'm moving scene state off the browser and onto a dedicated game server. The client and server stay in sync over WebSockets, so all connected players see the same bunny state in real time.
                </Text>
                <Text p>
                    The server is an async Python web server — chosen because LLM inference is I/O bound, so async gives much better throughput than threading. Each WebSocket connection streams scene updates to the bunny AI and fans the resulting actions back out to all connected clients.
                </Text>
                <Text p>
                    One subtle issue with inference on demand is cold-start latency — loading a GGUF model into memory takes several seconds, which would cause the bunny to freeze at the worst moment. To avoid this, inference instances have a <strong>keep-alive</strong> flag that holds the model in memory between requests during active gameplay, and an idle shutdown that unloads it after 2 hours of no traffic to reclaim RAM on the cluster.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Hosting
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_hosting.png" alt="Hosting architecture" size={ImageSize.MEDIUM} />
                <Text p>
                    The hosting setup splits the workload across a few different places to keep costs down:
                </Text>
                <List type={ListType.disc}>
                    <li><strong>Game client</strong> — a static React/Babylon.js bundle served from AWS S3 + CloudFront</li>
                    <li><strong>Game server</strong> — a persistent async WebSocket server running on my Raspberry Pi cluster, managing scene state and player connections</li>
                    <li><strong>Proxy API</strong> — a lightweight FastAPI service handling auth, routing, and the database. No ML dependencies, so it runs cheaply alongside the game server</li>
                    <li><strong>Inference worker</strong> — a separate, heavier Docker container with llama-cpp-python. Runs as a Kubernetes pod, spun up on demand and shut down when idle</li>
                </List>
                <Text p>
                    Splitting the proxy and inference into separate containers was a deliberate resource decision. The Pi cluster has limited RAM, and loading a GGUF model alongside the web server in a single process would leave no headroom for anything else.
                    By keeping inference in its own pod, Kubernetes can schedule it on the node with the most spare memory and kill it independently when it's not needed.
                </Text>
                <Text p>
                    Only one GGUF model is loaded at a time. When a new model is promoted from training, the proxy calls <strong>release()</strong> on the current adapter to unload it from RAM, then loads the replacement. On 8 GB nodes, there's no room for two models in flight simultaneously.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Remote Training and Evaluation
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_training.png" alt="Training pipeline" size={ImageSize.MEDIUM} />
                <Text p>
                    One of my explicit goals for this project is to understand what the remote compute landscape actually looks like in practice — not just pick one platform and stick with it. I wanted to build a system flexible enough to train, evaluate, and export models on Kaggle, RunPod, VastAI, and my own Kubernetes cluster, and learn the real trade-offs of each from experience rather than documentation.
                </Text>
                <Text p>
                    To make that possible without gluing together a fragile collection of scripts, I built a training pipeline service using <LinkTo href="https://temporal.io/" external className="underline">Temporal</LinkTo> to orchestrate the full workflow — data preparation, fine-tuning, evaluation, GGUF export, and S3 upload — as a durable, retryable process. Temporal means a failure on one platform doesn't lose progress; the workflow just picks up on the next available backend.
                </Text>
                <Text p>
                    Each platform has a distinct character. Kaggle offers free GPU/TPU hours but has a monthly cap and an API that regularly returns 500 errors mid-job. RunPod and VastAI rent GPU capacity on demand — more reliable but not free. The K8s cluster uses my own hardware, which is ideal when it has spare capacity but can't be relied on during peak inference load. Having all four as interchangeable backends means I can route around whoever is misbehaving that day.
                </Text>
                <Text p>
                    One non-obvious challenge with remote training is <strong>getting logs back</strong>. Kaggle and RunPod don't give you a stdout pipe — the training process runs inside their environment and you have no direct connection to it. My solution is a background thread in the remote worker that periodically flushes log chunks to S3 with an incremental cursor, and a server-sent events (SSE) endpoint on the API that tails those S3 writes and streams them to the UI in real time.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Interesting Problems
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_problems.png" alt="Interesting technical problems" size={ImageSize.MEDIUM} />
                <Text p>
                    This project has thrown up some genuinely difficult engineering problems:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Model size vs. accuracy</strong> — Getting a model accurate enough for simple bunny tasks while quantizing it down small enough to fit in the Pi's RAM required careful evaluation. I trained multiple variants and ran evals against a fixed benchmark — measuring per-stat accuracy, target-object selection, and action distribution — to find the right trade-off. A model that passes 95% accuracy on the eval suite gets promoted; anything below gets discarded and retrained with adjusted hyperparameters.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Hot-swap model loading in 8 GB RAM</strong> — Only one GGUF can be in memory at a time. Promoting a new model means calling <strong>release()</strong> on the current adapter to free the RAM, then loading the replacement. If the release fails or the new model doesn't load cleanly, the inference service goes down. I spent time making the handover atomic and adding fallback logic so a failed promotion reverts to the previous model rather than leaving the bunny brain-dead.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Resource contention</strong> — The game server and LLM inference compete for the same CPU and memory on the cluster. The idle shutdown (2-hour timeout based on <strong>last_used_at</strong>) helps significantly — the inference pod is only alive when someone is actually playing. When it is alive, Kubernetes resource limits prevent the inference worker from starving the game server during a heavy inference tick.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Deadlock in async Python + Temporal</strong> — Temporal activities run inside an async Python event loop, and some operations that look harmless can block it entirely. I hit a deadlock where a database write inside a Temporal activity was blocking the event loop, preventing the activity from completing and causing Temporal to retry it — which made the problem worse. The fix was ensuring all DB operations inside activities use async-compatible sessions rather than synchronous SQLAlchemy calls.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Hardware voltage issues</strong> — At peak load, voltage drops across the cluster caused the master node to become unstable. Combined with the volume of Prometheus metrics flowing through it, the master node couldn't keep up — leading to dropped metrics and unreliable scheduling decisions. Moving the monitoring stack off the master and onto worker nodes solved the instability, but diagnosing it took a while since the symptoms looked like software bugs.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Training workflow service reliability</strong> — Building a reliable, observable training orchestration service with Temporal meant designing for partial failures, platform timeouts, and cost limits across RunPod, Kaggle, and VastAI. Each platform has different error surfaces: Kaggle returns 500s when the notebook queue is full; RunPod pods can be preempted mid-training; VastAI instances occasionally fail to bootstrap. Temporal's retry semantics absorb most of this, but you still need activity-level error handling to distinguish a retryable network error from a genuine training failure.
                    </Text>
                </div>
                <Text p>
                    Each of these deserves its own post — I'll be writing them up as I work through them. If you have experience with any of these areas I'd love to hear from you below.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Building Fast with AI — Quality Baked In
                </Text>
                <Text p>
                    This project is more complex than anything I've built solo before — game engine, WebSocket server, async inference proxy, Temporal workflows, remote training pipelines, Kubernetes deployments. I built it quickly, and AI coding tools were a big part of why.
                </Text>
                <Text p>
                    The key shift is that AI doesn't just speed up writing code — it compresses the feedback loop. I can describe an architecture, get a working skeleton in minutes, and iterate on real behaviour rather than spending days on scaffolding.
                    But speed without quality is just faster mess. So I leaned on a set of practices to keep the codebase solid as I moved fast:
                </Text>
                <List type={ListType.disc}>
                    <li><strong>Test-first on every feature</strong> — writing the test before the implementation keeps scope tight and gives the AI a concrete target to hit</li>
                    <li><strong>AI-assisted code review</strong> — after every meaningful change, running a review pass catches bugs and design issues I'd miss when moving quickly</li>
                    <li><strong>Small, focused PRs</strong> — keeping changes atomic means the AI can reason about them accurately and I can verify correctness easily</li>
                    <li><strong>Automated CI gates</strong> — type checking, linting, and test runs on every push mean broken code never accumulates; it's caught immediately</li>
                    <li><strong>Explicit architecture upfront</strong> — spending 30 minutes planning the shape of a feature with the AI before writing any code avoids the expensive rewrites that come from discovering structural problems late</li>
                </List>
                <Text p>
                    The result is that I can move at a pace that would have felt reckless without AI tooling, while the codebase stays clean enough that I'm not scared to change things. That confidence compounds — each week I ship more because I'm not paying down debt from the week before.
                </Text>

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/aipet-part-2",
                        identifier: "aipet-part-2",
                        title: "AI Pet - Part 2",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
