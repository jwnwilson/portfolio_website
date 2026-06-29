/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, VideoPlayer } from "../../src/components";
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
                {/* <Image src="/public/imp_assets/posts/coming-soon.svg" alt="Coming soon" size={ImageSize.MEDIUM} /> */}
                {/* <Text p>I know you can unblur it, just don't as it's still rough and you'll be sad / disappointed.</Text> */}
                {/* COMING-SOON-BLUR START */}
                {/* <div className="blur-sm select-none pointer-events-none" aria-hidden="true"> */}
                <div className="flex flex-col">
                    <VideoPlayer url="/public/videos/llm_trainer_demo.mp4" poster="/public/imp_assets/posts/llm_training_pipeline/llm_screen_shot_01.png" light aspectRatio="1280 / 712" size={ImageSize.MEDIUM} playing caption="Training pipeline demo (click to play, with commentary)" />
                    <div className="w-full mt-5">
                        <Text p>
                            As part of digitising my bunnies <LinkTo href="/experiments/aipet-part-2" className="underline">AI Pet Part 2</LinkTo> series,
                            I was manually training models which requires a lot of waiting. So I accidentally automated the process and after some AI sessions here we are.
                        </Text>
                        <Text p>
                            This is a web app to take different base LLM models, train and evalutate them on multiple remote platforms. It can then dynamically load them for use in my projects on my own hardware.
                        </Text>
                        <Text p>
                            It's a react app, with a Python API backend and Temporal workflow orchestration, running on my <LinkTo href="/experiments/kubernetes-cluster" className="underline">kubernetes cluster</LinkTo>.
                        </Text>
                        <Text p>
                            Why didn't I use unsloth, huggingface or a managed service for this? Because I was having too much fun <LinkTo href="https://en.wiktionary.org/wiki/yak_shaving" className="underline">shaving the yak</LinkTo> and before I knew it I had an llm training pipeline.
                            I also wanted to learn the full life cycle of LLMs on a deeper level.
                        </Text>
                        <Text subtitle className="text-lg md:text-xl">
                            The goal
                        </Text>
                        <Text p>
                            Train multiple custom LLMs (cheaply), evalulate them, save them and load them dynamically to power my AI pet bunny, host it on my own hardware, and swap it into production without downtime.
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    Training Temporal Orchestration
                </Text>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/temporal_screenshot_01.png" alt="Temporal workflow orchestrating the training pipeline" size={ImageSize.MEDIUM} caption="A training workflow running in Temporal" />

                <Text p>
                    The core of this project is using <LinkTo href="https://temporal.io/" external className="underline">Temporal</LinkTo> to orchestrate the full workflow.
                    My training workflow does the following: 
                </Text>
                <List type={ListType.number}>
                    <li>Data generation / loading of existing data</li>
                    <li>Training / fine-tuning, saving checkpoints to blob storage (AWS S3)</li>
                    <li>Evaluation of the trained weights with pass / fail</li>
                    <li>Model file (GGUF) export and blob storage (AWS S3) upload</li>
                </List>
                <Text p>                    
                    The cool part of this workflow is I can dynamically select which platform to use for each stage of the training process. If any stage fails, Temporal failure doesn't lose progress; the workflow just re-tries and re-connects to remote compute automatically.
                </Text>

                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Challenge: Waiting For Remote Compute</strong> — Long running tasks in temporal require heartbeats to indicate liveness, I had to ensure my remote training activities were sending these heartbeats back to Temporal.
                        The activities trigger remote training then poll their status and sending heartbeats until completion. 
                    </Text>
                </div>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Challenge: Avoiding duplicates on disconnect</strong> — If temporal fails or the heartbeat deadline is exceeded, it will re-try the activity which could trigger duplicate training runs. To solve this I generate a unique ID for each training run and pass that to the remote platform, then if the same ID is seen again it knows to re-attach to the existing run instead of starting a new one. 
                    </Text>
                </div>

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
                <Image src="/public/imp_assets/posts/llm_training_pipeline/temporal_workflow_05.png" alt="How remote compute communicates with the Temporal workflow via files in S3" size={ImageSize.SMALL} />
                <Text p>
                    Currently communication between the remote compute and temporal workflow happens via files in AWS S3, temporal passes a run_id to remote worker. The remote worker then knows where it's input and output files should live in S3.
                    It reads config, input data and it writes logs, progress reports and checkpoints back to S3 for the workflow to pick up. 
                    The UI can show these updates and receives server-sent events (SSE) from the API that tails those S3 writes and streams them to the UI in real time.
                </Text>
                <Text p>
                    This is simple and has pros like not exhausting DB connections on parallel tasks, but it's not atomic and accidental overwrites are possible, the project will be need to manage this via LLM Service API calls to pool connections and be atomic in future.
                </Text>

                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Model size vs. accuracy</strong> — Getting a model accurate enough for simple bunny tasks while quantizing it down small enough to fit in the Pi's RAM required careful evaluation. I trained multiple variants and ran evals against a fixed benchmark — measuring per-stat accuracy, target-object selection, and action distribution — to find the right trade-off. A model that passes 95% accuracy on the eval suite gets promoted; anything below gets discarded and retrained with adjusted hyperparameters.
                    </Text>
                </div>

                <Seperator />

                <Text p subtitle>
                    Remote Training Platforms
                </Text>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/computer-fire.jpg" alt="Remote training platforms" size={ImageSize.MEDIUM} caption="Remote training platforms used in this project" />
                <Text p>
                    I quickly realised that raspberry pi's are not the best hardware for training LLMs, they took forever and got <strong>VERY</strong> hot (pictured).
                    So instead I used them to orchestrate remote training on dedicated GPU platforms, that way I could learn how to train LLMs on bare metal and
                    on remote machines where I can select the right hardware for the job.
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
                    I skipped the main cloud providers (AWS, GCP etc) as they're the most reliable but also the most expensive. 
                    If I were to do this for a "real" project I'd probably look at keeping data within the cloud provider I'm using. 
                    LLMs and training require a lot of network bandwidth, one of the largest costs for this project was data egress.
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    Kaggle
                </Text>
                <div className="float-left mr-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-28 md:w-32 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/kaggle_logo.svg" alt="Kaggle logo" className="w-full h-auto" />
                </div>
                <Text p>
                    Kaggle provides 30 hours of free training for non commercial use with decent hardware, I started here as it's very cost effective! The challenge is kaggle is designed to run notebooks, not containers and I had to use it creatively. I found is the best way to automate was package my logic in a library with a kaggle notebook that imports it, then using the Kaggle API to upload and trigger it.
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    Runpod
                </Text>
                <div className="float-right ml-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-32 md:w-40 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/runpod_logo.svg" alt="RunPod logo" className="w-full h-auto" />
                </div>
                <Text p>
                    Runpod had a good balance of cost, consistency and automation potential, this ended up being the fastest / most reliable platform for me. I select a GPU, docker image with command and params, it will initialise that and start it. Only downside is that sometimes it runs out of available GPUs and my workflows fail.
                </Text>

                <Text subtitle className="text-lg md:text-xl clear-both">
                    VastAI
                </Text>
                <div className="float-left mr-5 mb-3 bg-white rounded-lg p-3 shadow-sm w-32 md:w-40 flex items-center justify-center">
                    <img src="/imp_assets/posts/llm_training_pipeline/vastai_logo.svg" alt="VastAI logo" className="w-full h-auto" />
                </div>
                <Text p>
                    VastAI is interesting as it democratises GPUs allowing anyone to rent out their GPU, so it's the cheapest GPU provider and also the most
                    unreliable. I almost gave up on using this platform due to the slowness and reliability but got it working well in the end. So now I use this for the slow, cheapest jobs and my opinion on this has definitely improved!
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

                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        <strong>Training workflow service reliability</strong> — Building a reliable, observable training orchestration service with Temporal meant designing for partial failures, platform timeouts, and cost limits across RunPod, Kaggle, and VastAI. Each platform has different error surfaces: Kaggle returns 500s when the notebook queue is full; RunPod pods can be preempted mid-training; VastAI instances occasionally fail to bootstrap. Temporal's retry semantics absorb most of this, but you still need activity-level error handling to distinguish a retryable network error from a genuine training failure.
                    </Text>
                </div>

                <Seperator />

                <Text p subtitle>
                    Running Models
                </Text>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/llm_infer_01.png" alt="Remote training platforms" size={ImageSize.MEDIUM} caption="Running Created Models" />
                <Text p>
                    Now I have trained models I wanted to make starting and testing them easy. 
                    I am currently running my models on Kubernetes so I can take advantage of that API to dynamically start pods and give them an internal DNS.
                    If I start an "Inference" on my llm webapp the llm service will request a new pod loading the trained weights. 
                    It will monitor this pod and when it is available can proxy requests to it.
                    So now my LLM Services can access it via my private network!
                </Text>

                <Text p>
                    All access is managed via my LLM Service API, it has Oauth2 enabled for all public requests. 
                    This ensures I can control who and what makes requests to my LLMs. 
                </Text>

                <Seperator />

                <Text p subtitle>
                    Deliberate design / Automated testing
                </Text>
                <Text p>
                    I used AI to build this project, the scope was ambitious and in order to make progress on multiple platforms I needed a few key things:
                </Text>
                <List type={ListType.number}>
                    <li>A well structured project using <strong>SOLID principals and layered architecture</strong></li>
                    <li>Good instructions for the AI in architecture.md files, specs and design .md files</li>
                    <li><strong>TTD first approach</strong> to avoid AI faking tests for false confidence.</li>
                    <li>A <strong>fast</strong> CI/CD deployment pipeline so the AI could validate it's changes quickly</li> 
                    <li>Robust Automated tests and <strong>E2E tests on a deployed system</strong> to validate changes</li>
                </List>
                <Image src="/public/imp_assets/posts/llm_training_pipeline/github_screenshot_01.png" alt="GitHub Actions CI running the automated test suite" size={ImageSize.MEDIUM} caption="Automated tests and E2E checks running in CI" />
                <Text p>
                    This allowed me to iterate and valiadate changes <strong>rapidly</strong>, I could kick off an experiment / bug fix on claude while I focused on another part of the project. 
                    AI could then validate it's changes or report they weren't successful, once I was able to elimiate false positives I got a large productivity boost.
                </Text>
                <Text p>
                    I'll cover this more in a follow up post but this was essential for quickly verifying new logic and avoiding constant regressions.
                </Text>

                <Seperator />
                
                <Text p subtitle>
                    Result And Next Steps
                </Text>

                <Image src="/public/imp_assets/posts/llm_training_pipeline/obama_medal.webp" alt="Obama giving himself a medal" size={ImageSize.SMALL} caption="I think I did a god job!" />
                
                <Text p>
                    This project covers the entire LLM lifecycle and I've been able to generate models that I'm using in a project. That's a win for me!
                </Text>
                <Text p>
                    There are so many opportunities for next steps,
                    I'm thinking of creating a data generation functionality to make distillation training easier using 3rd party LLMs.
                    LLM training is all about preparing good training and eval data! 
                </Text>
                <Text p>
                    Other improvements will depend on what hardware I can get, as I've masterfully timed building this with all time highs in GPU and computing costs.
                    Hopefully this knowledge will help me optimise systems and reduce costs during this time!
                </Text>
                <Text p>
                    What do you think? Would love to hear your thoughts. :)
                </Text>

                <Seperator />

                <Text p subtitle>
                    Project Code
                </Text>

                <Text p>
                    The full source for the training pipeline service is available on GitHub: <LinkTo href="https://github.com/jwnwilson/llm_training_service" external className="underline">jwnwilson/llm_training_service</LinkTo>.
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
            {/* </div> */}
        </PageLayout>
    )
}

export default Article;
