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
                keywords: "ai pet, ai, llm, self-hosted, raspberry pi, babylon.js, multiplayer",
                author: "Noel Wilson",
                ogImage: "/public/imp_assets/posts/aipet/aipet_part2.png"
            }
        }>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                <div className="flex flex-col md:flex-row items-center">
                    <Image src="/public/imp_assets/posts/aipet/aipet_part2.png" alt="AI Pet Part 2" size={ImageSize.MEDIUM} />
                    <div className="w-full md:w-2/3 md:self-start mt-5 ml-5">
                        <Text p subtitle>
                            Where are we going?
                        </Text>
                        <Text p>
                            In <LinkTo href="/experiments/aipet-part-1" className="underline">part 1</LinkTo> I got a basic AI pet working — a bunny controlled by an LLM running in a Babylon.js 3D scene.
                            Part 2 is about taking that further: making the bunny smarter by running a self-hosted LLM, adding multiplayer so multiple people can interact with the same pet, and building out the infrastructure to make it all possible on a Raspberry Pi cluster.
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
                <List type={ListType.disc}>
                    <li>Self-hosted LLM powering the bunny's behaviour instead of a cloud API</li>
                    <li>Multiplayer — multiple users in the same scene talking to and interacting with the bunny simultaneously</li>
                    <li>Richer bunny actions and longer-term memory driven by a multi-agent approach</li>
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
                    <li><strong>LLM inference</strong> — a quantized model hosted on the same Pi cluster, providing the bunny's AI behaviour without any external API calls</li>
                </List>
                <Text p>
                    Running the LLM on the Pi cluster is the most interesting constraint. The cluster has limited RAM and compute, so the model needs to be small and heavily quantized while still being capable enough for the creative, low-accuracy tasks the bunny needs — choosing where to move, what to say, how to react.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Training
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_part2_training.png" alt="Training pipeline" size={ImageSize.MEDIUM} />
                <Text p>
                    To get a model small enough for the Pi, I need to fine-tune and quantize a base model specifically for the bunny's task. I built a training pipeline tool using <LinkTo href="https://temporal.io/" external className="underline">Temporal</LinkTo> to orchestrate the workflow across multiple remote platforms — RunPod, Kaggle notebooks, and the Kubernetes cluster itself — depending on what GPU capacity is available.
                </Text>
                <Text p>
                    The pipeline handles data preparation, distributed fine-tuning, quantization, evaluation, and promotion automatically. Temporal gives durable execution so a failed training run on one platform can resume or retry on another without losing progress.
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
                        <strong>Model size vs. accuracy</strong> — Getting a model accurate enough for simple bunny tasks while quantizing it down small enough to fit in the Pi's RAM required careful evaluation. I trained multiple variants and ran evals against a fixed benchmark to find the right trade-off.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Resource contention</strong> — The game server and LLM inference compete for the same CPU and memory on the cluster. Balancing traffic spikes from players against the latency budget for LLM responses required careful resource limits and Kubernetes scheduling.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Training workflow service</strong> — Building a reliable, observable training orchestration service with Temporal meant designing for partial failures, platform timeouts, and cost limits across RunPod and Kaggle.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Hardware voltage issues</strong> — At peak load, voltage drops across the cluster caused the master node to become unstable. Combined with the volume of Prometheus metrics flowing through it, the master node couldn't keep up — leading to dropped metrics and unreliable scheduling decisions.
                    </Text>
                </div>
                <Text p>
                    Each of these deserves its own post — I'll be writing them up as I solve them. If you have experience with any of these areas I'd love to hear from you below.
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
