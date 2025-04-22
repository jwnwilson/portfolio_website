/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";
import Head from "next/head";

const Article = () => {
    const { theme }  = useTheme();
    return (
        <PageLayout home>
            <div className='container px-3 pb-[20px] pt-20 md:pt-10'>
                <Text title className="text-3xl">
                    Reflections from a year as VP of Engineering
                </Text>
                <Image className="my-5" src="/public/imp_assets/posts/first_year/ship_stormy_sea.jpg" alt="Ship in a stormy sea" caption="Leading in the terbulent environment of an AI startup" size={ImageSize.SMALL} />
                <Text p>
                    I spent the last 12 months navigating the chaos of AI startup life, scaling technical teams. It’s been a year marked by breakthroughs, resilience, and some tough but rewarding lessons.
                </Text>
                <Text p>
                    We tackled massive technical challenges and hit ambitious goals that moved the company forward in a big way:
                </Text>
                <List type={ListType.number} className="mt-5">
                    <li><b>Reduced data generation time by 95</b>%</li>
                    <li><b>Scaled to support 10x more customers</b></li>
                    <li><b>Launched cutting-edge AI products that stand out in a competitive market</b></li>
                    <li><b>Built a high-performing, deeply collaborative engineering culture</b></li>
                </List>
                <Text p>
                    Looking back, here are a few principles and lessons that defined our year—and our growth.
                </Text>

                <Text subtitle>
                    Flexibility and consistency over correctness
                </Text>
                <Text p>
                    One of my key responsibilities is to align technology with business needs, even when those needs shift fast. This means resisting the urge to build “perfect” systems—instead, we build adaptable ones.
                </Text>
                <Text p>
                    We adopted <LinkTo href="https://en.wikipedia.org/wiki/Domain-driven_design" className="underline">domain-driven design</LinkTo> to map business problems to teams, giving them autonomy and driving productivity. We embraced <LinkTo href="https://martinfowler.com/bliki/HexagonalArchitecture.html" className="underline">hexagonal architecture</LinkTo> to maximise reversable decisions. Every team is using the same core tools, similar project structure and the same design patterns. Making it easy for teams to help each other, re-use work and share knowledge.
                </Text>
                <Text p>
                    Perfect is the enemy of good. In our world, it’s better to be pragmatic and aim for good enough and prioritise reducing the number of changes needed to react to new information quickly.
                </Text>

                <Text subtitle className="mt-10">Prioritise Strategic Work</Text>

                <Image
                  className="my-5 float-right ml-5 mr-5"
                  src="/public/imp_assets/posts/first_year/urgent_imporatant_matrix.webp"
                  alt="urgent important matrix"
                  caption="Consistent effort to stay in the top right quadrant"
                  size={ImageSize.XS}
                />
                
                <Text p>
                  One of my guiding principles has always been <b>prioritize strategic work over tactical firefighting</b>. But in a startup, immediate issues can cloud your ability to think even a few weeks ahead. Our strategic goal was to 
                  grow ARR by scaling to meet our growing customer demand.
                </Text>
                <Text p>
                  So we made the conscious (and at times painful) decision to reduce near-term sales activity so we could double down on foundational technical improvements. That short-term hit paid off—we're now operating at a scale we need to support 10x more customers.
                </Text>
                <Text p>
                    We achieved this by enacting the "kaizen initative", inspired by the Toyota term for "continuous improvement". This involved proactively identifying our largest bottlenecks and making plans to address them, then looking for the next bottleneck.
                </Text>
                <Text p>
                  We also simplified ruthlessly. <b>Startups don’t starve—they drown.</b> By trimming back non-essential projects, clarifying priorities, and choosing simple, durable plans, we preserved our most valuable resource: <b>Time</b>. Time to achieve our strategic goals.
                </Text>
                <Text subtitle className="mt-10">Invest in the team</Text>
                <Text p>
                I believe <b>teams of people with good attitude beat teams with more experience and a bad attitude every time</b>. Passionate, humble engineers who communicate well can learn any skill and teams of them become greater than the sum of their parts. That belief guided our hiring and mentoring practices all year.
                </Text>
                <Text p>
                    In our 1:1s, we put mentorship before status updates. We grew leaders from within, encouraged radical candor, and practiced healthy conflict resolution, <i>even around minor topics</i> so we’d be ready when the stakes were high.
                </Text>
                <Text p>
                    We embraced a <b>“leader-leader” model</b>: everyone gets ownership, everyone is trusted to lead and held accountable. The result? Autonomous teams that move faster and make better decisions. The accountability ripple effect is real — and powerful.
                </Text>

                <Text subtitle>
                    Stay the course
                </Text>
                <Text p>
                    In a world obsessed with speed and AI-powered pivots, it’s tempting to chase the next shiny insight. But we learned that sometimes, sticking with a solid-but-not-perfect plan is smarter than constantly shifting gears.
                </Text>
                <Text p>
                    One failed pivot taught us this the hard way. We moved too fast, ended up with a half-baked solution, and had to roll it all back. Now, we absorb customer learnings, update plans thoughtfully, and protect team momentum while staying agile.
                </Text>
                <Text p>
                    It’s about discipline, not rigidity. We adapt and iterate, but we also need to commit to a plan long enough to see the benefits. This balance has been key to our success.
                </Text>
                
                <Text subtitle>
                    Challenge with empathy
                </Text>
                <Text p>   
                    I’ve always been outcome-focused—but this year reminded me to lead with empathy, especially in moments of tension.
                    The strongest teams challenge each other with respect and with care.
                </Text>
                <Seperator/>
                <Text p>
                    I feel incredibly fortunate to be at Ocula, working with such a talented, driven team. I’ve grown more this year than any before—technically, strategically, and personally.

                    2025 is already shaping up to be a wild ride, and I’m excited to keep building, keep learning, and keep leading.
                </Text>
                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/blog/hexagonal-architecture",
                        identifier: "hexagonal-architecture",
                        title: "Hexagonal Architecture",
                    }
                
                }></DiscussionEmbed>
                
            </div>
        </PageLayout>
    )
}

export default Article;

