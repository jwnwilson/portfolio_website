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
                    <Image src="/public/imp_assets/posts/aipet/screenshot_01.png" alt="AI Pet Part 2" size={ImageSize.MEDIUM} caption={<LinkTo href="https://pet-simulator.co.uk/" external className="underline">Click here to check out the latest version!</LinkTo>} />
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            AI Pet - Part 2
                        </Text>
                        <Text p>
                            In my quest to digitise my former pet bunnies (Billy and Millie), I've deployed <LinkTo href="https://pet-simulator.co.uk/" external className="underline">pet-simulator</LinkTo> which is a multiplayer 3D browser game built on <LinkTo href="https://www.babylonjs.com/" external className="underline">Babylon.js</LinkTo> and <LinkTo href="https://colyseus.io/" external className="underline">Colyseus</LinkTo>,
                            running on a self-hosted <LinkTo href="/experiments/kubernetes-cluster" className="underline">Raspberry Pi Kubernetes cluster</LinkTo>.
                            It picks up where <LinkTo href="/experiments/aipet-part-1" className="underline">part 1</LinkTo> left off, a single-player prototype, and turns it into a shared experience powered by an AI brain.
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
                    New Hardware
                </Text>
                <Image src="/public/imp_assets/posts/aipet/rasp_cluster_02.jpeg" alt="Hardware setup" size={ImageSize.MEDIUM} />
                <Text p>
                    My bunnies now live in the corner of my office which I feel better about than them living in some AWS data center! I've updated the hardware slightly, with plans to add more later. I've wired up the network previously it ran wirelessly, but my router was struggling with the wireless traffic. 
                    I've also added a 16GB Raspberry Pi node (on the left) giving me 5 total nodes. I tagged the new node to run inference, it gives respectable performance running tiny models on CPU. 
                    I also had to upgrade the power supply as my cute minimal setup couldn't provide enough amps to keep the cluster stable under load!
                </Text>
                <Text p>
                    I also know when someone is visiting them as I can hear the raspberry pi CPU cooling activate on my LLM box. &#128513; 🪭🪭🪭
                </Text>

                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Challenge: Hardware voltage issues</strong> — Now we're stressing the hardware, my previous power supply couldn't deliver enough amps across the cluster causing the master node to become unstable. 
                        Raspbery Pis will throttle the CPU if they are underpowered and combined with the volume of Prometheus metrics data flowing through the master node, it couldn't keep up. The cluster periodically become unresponsive and I had to restart it.
                        Better power and moving the monitoring stack off the master and onto worker nodes solved the instability, but diagnosing it took a while since the symptoms looked like OOM (out of memory) errors and software bugs.
                    </Text>
                </div>
                 <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Challenge:  Resource contention</strong> The game server and LLM inference compete for the same CPU and memory on the cluster if not managed, causing nodes to crash. I added labels to nodes with deployment rules so inference <strong>STRONGLY</strong> prefers the 16GB node and other services avoid using it, also moving monitoring off the master node to avoid overloading it with requests.
                    </Text>
                </div>

                <Seperator />

                <Text p subtitle>
                    High Level Design
                </Text>
                <Image src="/public/imp_assets/posts/aipet/AI Pet Design 5.png" alt="High level design diagram" size={ImageSize.MEDIUM} />
                <Text p>
                    The v1 of aipet was just a single web server and database making API requests to Google Gemini.
                    Supporting multiplayer and self-hosted inference meant adding several more components.
                </Text>
                <List type={ListType.disc}>
                    <li>A multiplayer game server that is low latency</li>
                    <li>The game state is stored on the server and shared with all clients</li>
                    <li>The game server can access an LLM and use the output to drive the bunny's behaviour</li>
                    <li>The LLM container can load different weight files and be changed dynamically without downtime</li>
                </List>
                <Text p>
                    The backend splits across two languages, each chosen for its strengths: a TypeScript game server for real-time multiplayer, and Python services for the LLM proxy and model inference. 
                    I was talked into re-writing the server in typescript so the game server can share interfaces and code between the client and server, greatly simplifying game development. 
                    The Python LLM proxy and inference services can use the LLM libraries that I am most familiar with.
                </Text>
                <Text p>
                    The data flow looks like this:
                </Text>
                <List type={ListType.number}>
                    <li>Player connects to web browser client and it establishes a websocket connection with the gameserver</li>
                    <li>The game server will start a new game session if one doesn't exist or will add the player to an existing one with other people</li>
                    <li>The game loop runs for each game session, recieving player input and sending updates to all connected clients</li>
                    <li>The game loop periodically sends a request to the LLM service with scene info including player locations</li>
                    <li>The LLM service returns the bunny's next move / dialogue, which the game server incorporates into the scene updates sent to clients</li>
                </List>
                <Text p>
                    This architecture allows for a responsive multiplayer experience while keeping the AI logic modular and scalable.
                </Text>

                <Seperator />

                <Text p subtitle>
                    The Game Engine
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_engine.png" alt="Game engine architecture" size={ImageSize.MEDIUM} />
                <Text p>
                    To get this up to speed I started from the <LinkTo href="https://github.com/orion3dgames/t5c" external className="underline">T5C template</LinkTo>, which pairs Babylon.js and Colyseus.
                    Babylon.js is a powerful 3D game engine that runs in the browser, and Colyseus is a multiplayer framework that handles real-time communication and state synchronization between clients and the server.
                    I wanted a solid base with good design patterns for the AI to enhance rather than risk it creating a mess, especially as multiplayer is a hard problem with lots of edge cases.
                </Text>
                <Text p>
                    Colyseus runs the authoritative game state: each WebSocket connection streams player input in, and the server fans the resulting scene updates — including the bunny's AI-driven moves — back out to every connected client.
                </Text>
                <List type={ListType.disc}>
                    <li><strong>Game client</strong> — a static React/Babylon.js bundle served from AWS S3 + CloudFront</li>
                    <li><strong>Game server</strong> — a persistent TypeScript WebSocket server running on my Raspberry Pi cluster, managing scene state and player connections</li>
                </List>

                <Seperator />

                <Text p subtitle>
                    The LLM Proxy and Inference
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_hosting.png" alt="LLM proxy and inference architecture" size={ImageSize.MEDIUM} caption="Note: the LLM training is handled separately and will be covered in a follow-up post"/>
                <Text p>
                    The LLM management is split into two components:
                </Text>
                <List type={ListType.disc}>
                    <li><strong>Proxy API</strong> — a lightweight Python FastAPI service handling auth, routing, and the database. No ML dependencies, so it runs cheaply alongside the game server</li>
                    <li><strong>Inference worker</strong> — a separate, heavier Docker container running llama-cpp-python. Runs as a Kubernetes pod, spun up on demand and shut down when idle. It loads weights from a GGUF file stored in S3</li>
                </List>
                <Text p>
                    
                </Text>
                <Text p>
                    Splitting the proxy and inference into separate containers keeps the proxy API performant and makes memory / CPU management in the cluster easier. 
                    The inference node has 16GB of RAM, so it can fit two LLM pods. This lets me load a new inference model for the game, handle routing seamlessly, and shut down the old inference pod.
                </Text>
                <Text p>
                    The model is currently <strong>HuggingFaceTB/SmolLM2-360M</strong>, which is optimised for speed; I can get full responses from inference in 2-3 seconds. 
                    I also tried <strong>HuggingFaceTB/SmolLM2-1.7B</strong>, but inference time rose to 10-15 seconds. 
                    After running simple evals the tiny model was <strong>returning reasonable answers 95% of the time</strong>, which is good enough for now.
                    I'm looking at adding a GPU node then I can use this pattern to load a better model for more complex behaviour and dialogue while keeping response times low.
                </Text>
                <Text p>
                    Now my training service is up, I can easily try more models, which I'll cover in a follow-up post.
                </Text>

                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Challenge: Hot-swap model loading</strong> — Only two inference pods can fit on the 16GB node in memory at a time. Promoting a new model means spinning up a new pod and shutting down the old one to free the RAM.
                        If the release fails or the new model doesn't load cleanly, the game will not be affected and the failing pod will be terminated.
                        I also added a cleanup job that runs periodically to catch any unused inference pods that didn't shut down correctly and could be taking up resources.
                    </Text>
                </div>

                <Seperator />

                <Text p subtitle>
                    Show me the Code!
                </Text>
                <Text p>
                    Here's the project if you'd like to see the code: <LinkTo href="https://github.com/jwnwilson/aipet" external className="underline">github.com/jwnwilson/aipet</LinkTo>
                </Text>

                <Seperator />


                <Text p subtitle>
                    Related Posts
                </Text>
                <List type={ListType.disc}>
                    <li><LinkTo href="/experiments/aipet-part-1" className="underline">AI Pet - Part 1</LinkTo> — building an ai pet prototype with Google Gemini</li>
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
