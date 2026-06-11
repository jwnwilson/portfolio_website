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
                title: "Building a Complete Project Using AI as a Solo Dev",
                description: "How to ship ambitious solo projects fast without sacrificing code quality — test-first, AI-assisted review, small PRs, and automated CI gates",
                keywords: "ai, solo dev, software engineering, claude, code quality, tdd, ci, productivity",
                author: "Noel Wilson",
                ogImage: "/public/imp_assets/posts/aipet/aipet_part2.png"
            }
        }>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                {/* COMING-SOON header — visible while the post is unfinished.
                    TO RELEASE: delete this <Image> and unwrap the COMING-SOON-BLUR div below. */}
                <Image src="/public/imp_assets/posts/coming-soon.svg" alt="Coming soon" size={ImageSize.MEDIUM} />
                {/* COMING-SOON-BLUR START */}
                <div className="blur-sm select-none pointer-events-none" aria-hidden="true">
                <div className="flex flex-col">
                    <div className="w-full mt-5">
                        <Text p subtitle>
                            Building a Complete Project Using AI as a Solo Dev
                        </Text>
                        <Text p>
                            For my <LinkTo href="/experiments/aipet-part-2" className="underline">AI Pet Part 2</LinkTo> project I built more than I've ever shipped solo:
                            a Babylon.js game engine, a WebSocket multiplayer server, an async inference proxy, Temporal training workflows, remote compute integrations across four platforms, and a Kubernetes deployment on a Raspberry Pi cluster.
                            I built it quickly — and AI coding tools were a central reason why.
                        </Text>
                        <Text p>
                            But speed without quality is just faster mess. This post is about how I kept the codebase solid while moving fast.
                        </Text>
                    </div>
                </div>

                <Seperator />

                <Text p subtitle>
                    The Shift AI Makes
                </Text>
                <Text p>
                    AI doesn't just speed up writing code — it compresses the feedback loop at every stage. I can describe an architecture, get a working skeleton in minutes, and iterate on real behaviour rather than spending days on scaffolding. A feature that would have taken a week to wire up now takes an afternoon.
                </Text>
                <Text p>
                    The risk is that you move so fast that problems pile up invisibly. Without discipline, you end up with a codebase that works now but that you're afraid to touch next month. The practices below are what I used to prevent that.
                </Text>

                <Seperator />

                <Text p subtitle>
                    Quality Baked In
                </Text>
                <List type={ListType.disc}>
                    <li>
                        <strong>Test-first on every feature</strong> — writing the test before the implementation keeps scope tight and gives the AI a concrete target to hit. The AI is much better at writing code that satisfies a clear spec than at guessing what the right behaviour should be.
                    </li>
                    <li>
                        <strong>AI-assisted code review</strong> — after every meaningful change, a review pass catches bugs and design issues I'd miss when moving quickly. It's not a substitute for thinking, but it's a reliable second pair of eyes that doesn't get tired.
                    </li>
                    <li>
                        <strong>Small, focused PRs</strong> — keeping changes atomic means the AI can reason about them accurately and I can verify correctness easily. Large PRs are where subtle bugs hide.
                    </li>
                    <li>
                        <strong>Automated CI gates</strong> — type checking, linting, and test runs on every push mean broken code never accumulates; it's caught immediately. This is cheap to set up and pays off constantly.
                    </li>
                    <li>
                        <strong>Explicit architecture upfront</strong> — spending 30 minutes planning the shape of a feature with the AI before writing any code avoids the expensive rewrites that come from discovering structural problems late. The AI is a good thinking partner at the design stage, not just the implementation stage.
                    </li>
                </List>

                <Seperator />

                <Text p subtitle>
                    The Compound Effect
                </Text>
                <Text p>
                    The most important thing I noticed: the quality practices compound. Each week I ship more because I'm not paying down debt from the week before. The codebase stays clean enough that I'm not scared to change things — and that confidence frees me to take on more ambitious features.
                </Text>
                <Text p>
                    As a solo dev, I'm also the only person who reads most of this code. AI tooling changes the equation: I now have something that can review, question, and push back on my decisions at any hour. That's a qualitatively different way of working from what solo development looked like before.
                </Text>
                <Text p>
                    If you're a solo dev sitting on an ambitious project you keep putting off because it feels too large — I'd encourage you to try this approach. The tools have genuinely changed what one person can ship.
                </Text>

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/blog/ai-solo-dev",
                        identifier: "ai-solo-dev",
                        title: "Building a Complete Project Using AI as a Solo Dev",
                    }
                }></DiscussionEmbed>
                </div>
                {/* COMING-SOON-BLUR END */}
            </div>
        </PageLayout>
    )
}

export default Article;
