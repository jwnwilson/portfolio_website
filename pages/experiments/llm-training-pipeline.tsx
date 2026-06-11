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
                title: "Building a LLM Training Pipeline",
                description: "Remote training and evaluation across Kaggle, RunPod, VastAI, and Kubernetes — building a durable, platform-agnostic LLM training pipeline with Temporal",
                keywords: "llm, training, pipeline, temporal, kaggle, runpod, vastai, kubernetes, raspberry pi, gguf, fine-tuning",
                author: "Noel Wilson",
                ogImage: "/public/imp_assets/posts/aipet/aipet_part2_training.png"
            }
        }>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                {/* {/* COMING-SOON header — visible while the post is unfinished.
                    TO RELEASE: delete this <Image> and unwrap the COMING-SOON-BLUR div below. */}
                {/* <Image src="/public/imp_assets/posts/coming-soon.svg" alt="Coming soon" size={ImageSize.MEDIUM} /> */}
                {/* COMING-SOON-BLUR START */}
                <div className="blur-sm select-none pointer-events-none" aria-hidden="true"> */}
                <div className="flex flex-col">
                    <Image src="/public/imp_assets/posts/aipet/aipet_part2_training.png" alt="Training pipeline" size={ImageSize.MEDIUM} />
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            Building a LLM Training Pipeline
                        </Text>
                        <Text p>
                            This is part of the <LinkTo href="/experiments/aipet-part-2" className="underline">AI Pet Part 2</LinkTo> series.
                            The goal: train a custom LLM to power my AI pet bunny, host it on my own hardware, and swap it into production without downtime.
                            To do that I needed a training pipeline flexible enough to run across multiple remote compute platforms — and reliable enough to survive any one of them failing.
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    Remote Training and Evaluation
                </Text>
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
                <Text p>
                    Building this pipeline surfaced some genuinely tricky engineering problems:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Model size vs. accuracy</strong> — Getting a model accurate enough for simple bunny tasks while quantizing it down small enough to fit in the Pi's RAM required careful evaluation. I trained multiple variants and ran evals against a fixed benchmark — measuring per-stat accuracy, target-object selection, and action distribution — to find the right trade-off. A model that passes 95% accuracy on the eval suite gets promoted; anything below gets discarded and retrained with adjusted hyperparameters.
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Deadlock in async Python + Temporal</strong> — Temporal activities run inside an async Python event loop, and some operations that look harmless can block it entirely. I hit a deadlock where a database write inside a Temporal activity was blocking the event loop, preventing the activity from completing and causing Temporal to retry it — which made the problem worse. The fix was ensuring all DB operations inside activities use async-compatible sessions rather than synchronous SQLAlchemy calls.
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

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/llm-training-pipeline",
                        identifier: "llm-training-pipeline",
                        title: "Building a LLM Training Pipeline",
                    }
                }></DiscussionEmbed>
                </div>
                {/* COMING-SOON-BLUR END */}
            </div>
        </PageLayout>
    )
}

export default Article;
