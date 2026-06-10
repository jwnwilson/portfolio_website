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
                    <Image src="/public/imp_assets/posts/aipet/screenshot_01.png" alt="AI Pet Part 2" size={ImageSize.MEDIUM} caption={<>Click <LinkTo href="https://pet-simulator.co.uk/" external className="underline">here</LinkTo> to check out the latest version.</>} />
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            AI Pet - Part 2
                        </Text>
                        <Text p>
                            In <LinkTo href="/experiments/aipet-part-1" className="underline">part 1</LinkTo> I built a simple AI pet bunny controlled by a 3rd party LLM in a 3D scene,
                            in my <LinkTo href="/experiments/kubernetes-cluster" className="underline">Kubernetes post</LinkTo> I built a self-hosted Raspberry Pi cluster.
                            I want to reduce hosting costs and use this new hardware so now I've deployed the latest version to my new hardware with the following improvements:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Upgrading the game to use a game engine with multiplayer</li>
                                <li>Improving the visuals with better sprites and animations</li>
                                <li>Deploying the game server onto my own hardware</li>
                                <li>Training a custom LLM to power it</li>
                                <li>Deploying and self hosting the LLM to power my aipet</li>
                            </ul>
                        </Text>
                        <Text p>
                            Ultimate goal:
                        </Text>
                        <Text p>
                            A self-hosted AI pet controlled by LLMs, trained remotely then hosted on my own hardware, interacting with multiple players.
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    High Level Design
                </Text>
                <Image src="/public/imp_assets/posts/aipet/AI Pet Part 2 Design 2.png" alt="High level design diagram" size={ImageSize.MEDIUM} />
                <Text p>
                    The v1 of aipet is a single server making API requests to Google Gemini. To achieve my goals I needed to add more components that will give me more flexibility.
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
                    Interesting Problems
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_problems.png" alt="Interesting technical problems" size={ImageSize.MEDIUM} />
                <Text p>
                    This project has thrown up some genuinely difficult engineering problems. The training and workflow challenges are covered in the <LinkTo href="/experiments/llm-training-pipeline" className="underline">LLM Training Pipeline</LinkTo> post — the ones below are specific to the game and hosting layer:
                </Text>
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
                        <strong>Hardware voltage issues</strong> — At peak load, voltage drops across the cluster caused the master node to become unstable. Combined with the volume of Prometheus metrics flowing through it, the master node couldn't keep up — leading to dropped metrics and unreliable scheduling decisions. Moving the monitoring stack off the master and onto worker nodes solved the instability, but diagnosing it took a while since the symptoms looked like software bugs.
                    </Text>
                </div>
                <Text p>
                    Each of these deserves its own post — I'll be writing them up as I work through them. If you have experience with any of these areas I'd love to hear from you below.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Related Posts
                </Text>
                <List type={ListType.disc}>
                    <li><LinkTo href="/experiments/llm-training-pipeline" className="underline">Building a LLM Training Pipeline</LinkTo> — remote training across Kaggle, RunPod, VastAI, and Kubernetes with Temporal</li>
                    <li><LinkTo href="/blog/ai-solo-dev" className="underline">Building a Complete Project Using AI as a Solo Dev</LinkTo> — how to ship fast without sacrificing quality</li>
                </List>

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
