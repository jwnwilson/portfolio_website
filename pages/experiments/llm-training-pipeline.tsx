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
                ogImage: "/public/imp_assets/posts/llm_training_pipeline/llm_screen_shot_01.png"
            }
        }>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                {/* COMING-SOON header — visible while the post is unfinished.
                    TO RELEASE: delete this <Image> and unwrap the COMING-SOON-BLUR div below. */}
                <Image src="/public/imp_assets/posts/coming-soon.svg" alt="Coming soon" size={ImageSize.MEDIUM} />
                <Text p>I know you can unblur it, just don't as it's still rough / ai slop and you'll be sad / disappointed.</Text>
                {/* COMING-SOON-BLUR START */}
                <div className="blur-sm select-none pointer-events-none" aria-hidden="true">
                <div className="flex flex-col">
                    <Image src="/public/imp_assets/posts/llm_training_pipeline/llm_screen_shot_01.png" alt="Training pipeline" size={ImageSize.MEDIUM} />
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            Building a LLM Training Pipeline
                        </Text>
                        <Text p>
                            As part of digitising my bunnies <LinkTo href="/experiments/aipet-part-2" className="underline">AI Pet Part 2</LinkTo> series.
                            During testing I quickly realised that raspberry pi's are not the best hardware for training LLMs when they took forever then started smoking. (Add cmon do something meme)
                            So instead I used them to orchestrate remote training on multiple platforms, that way I could learn how to train LLMs on bare metal and
                            on remote machines where I can select the right hardware for the job.
                        </Text>
                        <Text p>
                            I also wanted to load these trained llm weights dynamically so I could use this for my toy project and have a viable pattern for real world
                            usage.
                        </Text>
                        <Text subtitle className="text-lg md:text-xl">
                            The goal
                        </Text>
                        <Text p>
                            Train multiple custom LLMs (cheaply), eval them, save them and load them dynamically to power my AI pet bunny, host it on my own hardware, and swap it into production without downtime.
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    Training Temporal Orchestration
                </Text>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/temporal_screenshot_01.png" alt="Temporal workflow orchestrating the training pipeline" size={ImageSize.MEDIUM} caption="A training workflow running in Temporal" />

                <Text p>
                    I built a training pipeline service using <LinkTo href="https://temporal.io/" external className="underline">Temporal</LinkTo> to orchestrate the full workflow.
                    My training workflow does the following: 
                </Text>
                <List type={ListType.number}>
                    <li>Data generation / loading of existing data</li>
                    <li>Training / fine-tuning, saving checkpoints to S3</li>
                    <li>Evaluation of the trained weights</li>
                    <li>GGUF export and S3 upload</li>
                </List>
                <Text p>                    
                    The cool part of this workflow is I can dynamically select which platform to use for each stage of the training process. If any stage fails, Temporal failure doesn't lose progress; the workflow just re-tries and re-connects to remote compute automatically.
                </Text>

                <Text p subtitle>
                    Orchestration Management
                </Text>
                <Text p>
                    To manage this process I build the LLM API and UI, with this I can:
                </Text>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/llm_model_selection.png" alt="Model selection in the LLM management UI" size={ImageSize.MEDIUM} caption="Selecting a base model in the LLM management UI" />
                <List type={ListType.disc}>
                    <li>Select which base model to use</li>
                    <li>Select uploaded datasets and set training parameters</li>
                    <li>Select remote compute to train on</li>
                    <li>Trigger new training runs</li>
                    <li>Monitor the progress</li>
                    <li>Promote successful model training to load as inference models.</li>
                </List>
                <Text p>
                    One non-obvious challenge with remote training is <strong>getting logs back</strong>. Kaggle and RunPod don't give you a stdout pipe — the training process runs inside their environment and you have no direct connection to it. My solution is a background thread in the remote worker that periodically flushes log chunks to S3 with an incremental cursor, and a server-sent events (SSE) endpoint on the API that tails those S3 writes and streams them to the UI in real time.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Remote Training Platforms
                </Text>
                <Text p>
                    The cheapest platforms for training LLMs I found where:
                </Text>
                <List type={ListType.disc}>
                    <li>Kaggle</li>
                    <li>RunPod</li>
                    <li>VastAI</li>
                    <li>My own Kubernetes cluster</li>
                </List>
                <Text p>
                    I skipped the main cloud providers as they're the most reliable but also the most expensive. If I were to do this for a "real" project I'd probably look at keeping data within the cloud provider I'm using like AWS Sagemaker. LLMs and training require a lot of network bandwidth, one of the largest costs for me was data egress.
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    Kaggle
                </Text>
                <div className="float-left mr-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-28 md:w-32 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/kaggle_logo.svg" alt="Kaggle logo" className="w-full h-auto" />
                </div>
                <Text p>
                    Kaggle provides 30 hours of free training for non commercial use with decent hardware, I started with this as it's very cost effective! The challenge is the API is ok and I had to use it creatively as it's designed to trigger python notebooks and not run containers. I found is the best way to automate training / eval was package my logic in a library and creating a notebook with the library then triggering it.
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    Runpod
                </Text>
                <div className="float-right ml-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-32 md:w-40 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/runpod_logo.svg" alt="RunPod logo" className="w-full h-auto" />
                </div>
                <Text p>
                    Runpod had a good balance of cost, consistency and automation potential, this ended up being the fastest / most reliable platform for me. I select a GPU an image and command with params I want it to run and it will spin that up and run it quickly. Only downside is that sometimes it runs out of GPUs and my workflows fail.
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    VastAI
                </Text>
                <div className="float-left mr-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-32 md:w-40 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/vastai_logo.svg" alt="VastAI logo" className="w-full h-auto" />
                </div>
                <Text p>
                    VastAI is interesting as it democratises GPUs allowing anyone to rent out their GPU, so it's the cheapest GPU provider and also the most
                    unreliable. I almost gave up on using this platform due to the slowness and reliability but got it working well in the end so my opinion on this has definitely improved!
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    K3 pod
                </Text>
                <div className="float-right ml-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-28 md:w-32 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/k3s_logo.svg" alt="K3s logo" className="w-full h-auto" />
                </div>
                <Text p>
                    I want the ability to run all my logic on my own hardware for when I upgrade my local setup, this is currently slow as there's no GPU and limited but wanted to ensure it works!
                </Text>

                <div className="clear-both" />

                <Text p subtitle>
                    Deliberate design &amp;&amp; Automated testing
                </Text>
                <Text p>
                    I used AI to build this project, the scope was ambitious and in order to make progress on multiple platforms I needed to do 2 things:
                </Text>
                <List type={ListType.number}>
                    <li>Design the project using SOLID principals and hexagonal architecture</li>
                    <li>Create robust Automated tests and E2E tests to validate changes</li>
                </List>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/github_screenshot_01.png" alt="GitHub Actions CI running the automated test suite" size={ImageSize.MEDIUM} caption="Automated tests and E2E checks running in CI" />
                <Text p>
                    I'll cover this more in a follow up post but this was essential for quickly verifying new logic and avoiding constant regressions.
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
