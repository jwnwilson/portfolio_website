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
                    Reflections from 2025: A year leading a startup in Engineering
                </Text>
                <Image className="my-5" src="/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp" alt="This is fine meme" caption="Look Better by making everyone else worse" size={ImageSize.SMALL} />
                <Text p>
                    Reaching my first year working as a VP of engineering, I’ve been reflecting on an intense, rewarding year leading engineering at a startup. It’s been a year marked by breakthroughs, resilience, and some tough but rewarding lessons.
                </Text>
                <Text p>
                    we tackled massive technical challenges and hit ambitious goals that moved the company forward in a big way:
                </Text>
                <List type={ListType.number} className="mt-5">
                    <li><b>Reduced data generation time by 95</b>%</li>
                    <li><b>Scaled to support 10x more customers</b></li>
                    <li><b>Launched cutting-edge AI products that stand out in a crowded market</b></li>
                    <li><b>Built a high-performing, deeply collaborative engineering culture</b></li>
                </List>
                <Text p>
                    Looking back, here are a few principles and lessons that defined our year—and my growth.
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
                  We also simplified ruthlessly. <b>Startups don’t starve—they drown.</b> By trimming back non-essential projects, clarifying priorities, and choosing simple, durable plans, we preserved our most valuable resource: time. Time to achieve our strategic goals.
                </Text>
                <Text subtitle className="mt-10">Invest in the team</Text>
                <Text p>
                I believe teams of people with <b>good attitude beat teams with good aptitude and a bad attitude every time</b>. Passionate, humble engineers who communicate well can learn any skill and teams of them become greater than the sum of their parts. That belief guided our hiring and mentoring practices all year.
                </Text>
                <Text p>
                    In our 1:1s, we put mentorship before status updates. We grew leaders from within, encouraged radical candor, and practiced healthy conflict resolution <i>even around minor topics</i> so we’d be ready when the stakes were high.
                </Text>
                <Text p>
                    We embraced a <b>“leader-leader” model</b>: everyone gets ownership, everyone is trusted to lead and held accountable. The result? Autonomous teams that move faster and make better decisions. The accountability ripple effect is real — and powerful.
                </Text>
                <Text subtitle>
                    Flexibility and consistency over correctness
                </Text>
                <Text p>
                    One of my key responsibilities is to align technology with business needs, even when those needs shift fast. This means resisting the urge to build “perfect” systems—instead, we build adaptable ones.
                </Text>
                <Text p>
                    We adopted domain-driven design to map business problems to teams, giving them autonomy and driving productivity. We embraced hexagonal architecture to maximise reversable decisions, with every team using the same core tools and patterns, making it easy to shift people, scale teams, and share knowledge.
                </Text>
                <Text p>
                    Perfect is the enemy of good. In our world, it’s better to be pragmatic and aim for good enough and prioritise reducing the number of changes needed to react to new information quickly.
                </Text>
                <Text subtitle>
                    Stay the course
                </Text>
                <Text p>
                    This is simple rule to help with the above.
                    In an AI driven agile world it's tempting to change priorities quickly and often but commiting 100% to the 2nd or 3rd best options will often
                    yield better results than putting 50% effort into the best option. We learned this the hard way when we tried to pivot too quickly and ended up with a half baked solution that didn't meet our needs.
                    We ended up having to roll back changes and would have been better to stick with the original plan.

                    Now when we get new learnings from customers we give teams time to work that into current work and then we review the plan. This results in teams
                    not losing momentum and being agile enough to adapt when necessary. It also gives time for us to solidify the new approach and find edge cases that
                    might invalidate it before the team starts working on it.
                </Text>
                <Text subtitle>
                    Overall
                </Text>
                <Text p>   
                    
                    Challenge with empathy

                    - I've never been afraid to challenge but when focusing on a outcome I've failed to respect other people's point of view.

                    

                    - I am lucky to be working at Ocula and to be working with such a talented team. I am excited to see what the next year brings and to continue to grow and develop as a leader.

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

