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
                    <Image src="/public/imp_assets/posts/aipet/screenshot_01.png" alt="AI Pet Part 2" size={ImageSize.MEDIUM} caption={<LinkTo href="https://pet-simulator.co.uk/" external className="underline">Click here to check out the latest version.</LinkTo>} />
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            AI Pet - Part 2
                        </Text>
                        <Text p>
                            I've deployed <LinkTo href="https://pet-simulator.co.uk/" external className="underline">pet-simulator</LinkTo> which is a multiplayer 3D browser game built on <LinkTo href="https://www.babylonjs.com/" external className="underline">Babylon.js</LinkTo> and <LinkTo href="https://colyseus.io/" external className="underline">Colyseus</LinkTo>,
                            running on a self-hosted <LinkTo href="/experiments/kubernetes-cluster" className="underline">Raspberry Pi Kubernetes cluster</LinkTo>.
                            It picks up where <LinkTo href="/experiments/aipet-part-1" className="underline">part 1</LinkTo> left off, a single-player prototype and turns it into a shared experience powered by an AI brain.
                        </Text>
                        <Text p>
                            Features:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>A live 3D scene where multiple players can join and interact with the same bunny simultaneously</li>
                                <li>An AI bunny whose behaviour is driven by an LLM hosted on my own hardware</li>
                                <li>Improved visuals with better sprites and animations</li>
                                <li>A custom-trained model that can be hot-swapped into production without downtime</li>
                                <li>Full self-hosting — game server, inference worker, and database all run on the Raspberry Pi cluster</li>
                            </ul>
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    High Level Design
                </Text>
                <Image src="/public/imp_assets/posts/aipet/Ai Pet Design 4.png" alt="High level design diagram" size={ImageSize.MEDIUM} />
                <Text p>
                    The v1 of aipet was just a single web server and database making API requests to Google Gemini.
                    Supporting multiplayer and self-hosted inference meant adding several more components.
                </Text>
                <Text p>
                    Requirements:
                </Text>
                <List type={ListType.disc}>
                    <li>A multiplayer game server that is low latency</li>
                    <li>The game state is stored on the server and shared with all clients</li>
                    <li>The game server can access an LLM and use the output to drive the bunny's behaviour</li>
                    <li>The LLM container can load different weight files and be changed dynamically without downtime</li>
                </List>
                <Text p>
                    The backend splits across two languages, each chosen for its strengths: a TypeScript game server for real-time multiplayer, and Python services for the LLM proxy and model inference. The games server can
                    share code between the client and server greatly simplifying game development. The python llm proxy and inference services can use the llm libraries that I am most familiar with.
                </Text>
                <Text p>
                    The game client is a Babylon.js app that runs in the browser and connects to the game server over WebSockets. It renders the scene, sends player input to the server, and receives scene updates to keep everything in sync. 
                </Text>
                <Text p>
                    The game server is a TypeScript Express app that owns the game state, player connections, and the game loop. When the bunny needs to act, it calls the Python LLM service over internal DNS that never leaves the private network.
                </Text>
                <Text p>
                    The LLM service is a Python proxy running in its own container. Using a ports &amp; adapters pattern, it either calls OpenRouter for third-party models or a locally hosted inference instance reachable only inside the private network.
                </Text>

                <Seperator />

                <Text p subtitle>
                    The Game Engine
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_engine.png" alt="Game engine architecture" size={ImageSize.MEDIUM} />
                <Text p>
                    To get this up to speed I started from the <LinkTo href="https://github.com/orion3dgames/t5c" external className="underline">T5C template</LinkTo>, which pairs Babylon.js and Colyseus.
                    Babylon.js is a powerful 3D game engine that runs in the browser, and Colyseus is a multiplayer framework that handles real-time communication and state synchronization between clients and the server.
                    I wanted a solid base with good design patterns for the AI to enhance rather than risk it creating a mess especially as multiplayer is a hard problem with lots of edge cases.
                </Text>
                <Text p>
                    Colyseus runs the authoritative game state: each WebSocket connection streams player input in, and the server fans the resulting scene updates including the bunny's AI-driven moves back out to every connected client.
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
                    <li><strong>Game server</strong> — a persistent TypeScript WebSocket server running on my Raspberry Pi cluster, managing scene state and player connections</li>
                    <li><strong>Proxy API</strong> — a lightweight Python FastAPI service handling auth, routing, and the database. No ML dependencies, so it runs cheaply alongside the game server</li>
                    <li><strong>Inference worker</strong> — a separate, heavier Docker container running async llama-cpp-python (inference is I/O-bound, so async beats threading for throughput). Runs as a Kubernetes pod, spun up on demand and shut down when idle</li>
                </List>
                <Text p>
                    Splitting the proxy and inference into separate containers was a deliberate resource decision. The Pi cluster has limited RAM, and loading a GGUF model alongside the web server in a single process would leave no headroom for anything else.
                    By keeping inference in its own pod, Kubernetes can schedule it on the node with the most spare memory and kill it independently when it's not needed.
                </Text>
                <Text p>
                    One subtle issue with inference on demand is cold-start latency loading a GGUF model into memory takes several seconds, which would cause the bunny to freeze at the worst moment. To avoid this, inference instances have a <strong>keep-alive</strong> flag that holds the model in memory between requests during active gameplay, and an idle shutdown that unloads it after 2 hours of no traffic to reclaim RAM on the cluster.
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
