/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";
import Head from "next/head";

const Article = () => {
    const { theme }  = useTheme();
    return (
        <PageLayout standard>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                <Text subtitle>
                    Wins and Challenges
                </Text>
                <Text p>
                    I spent the last 12 months scaling technical teams, navigating the chaotic life as VP of Engineering at an AI startup, here's what we achieved and learned at Ocula over the last 12 months.
                </Text>
                <div className="flex flex-col md:flex-row items-center">
                    <Image className="my-5 md:w-1/3 md:mr-5 mt-0 h-auto" src="/public/imp_assets/posts/first_year/ship_stormy_sea.jpg" alt="Ship in a stormy sea" caption="Leading in the turbulent environment of an AI startup" size={ImageSize.SMALL} />
                    <div className="md:w-2/3">
                        <Text p>
                            <b>Wins</b>
                        </Text>
                        <List type={ListType.number}>
                            <li>Creating a high quality AI product rather than a generic AI wrapper</li>
                            <li>Increased our AI copywriting output by 95%</li>
                            <li>Scaled our platform to support 10x more customers</li>
                            <li>Built a high-performing, deeply collaborative engineering culture</li>
                        </List>
                        <Text p>
                            <b>Challenges</b>
                        </Text>
                        <List type={ListType.number}>
                            <li>Not validating product markert fit well enough</li>
                            <li>Scaling the team too fast before product market fit</li>
                        </List>
                    </div>
                </div>

                <Text p>
                    There is a lot of competition in the AI space with many AI wrappers, we decided to invest in the quality of output over lots of shallow features. This meant moving slower initially and we lost customers to AI wrappers in the space. 
                    Over time though we have been winning them back as we increased our output with higher quality. Here's how we're been building momentum in our product. 
                </Text>

                <hr className="my-10" />
        
                <Text subtitle>
                    Flexibility and consistency over correctness
                </Text>
                <Text p>
                    One of my key responsibilities is to align technology with business needs, this means resisting the urge to build “perfect” systems—instead, we build adaptable ones.
                </Text>
                <Text p>
                    We adopted <LinkTo href="https://en.wikipedia.org/wiki/Domain-driven_design" className="underline">domain-driven design</LinkTo> to map business problems to teams, giving them autonomy and driving productivity. We embraced <LinkTo href="https://martinfowler.com/bliki/HexagonalArchitecture.html" className="underline">hexagonal architecture</LinkTo> to maximise reversable decisions. Every team is using the same core tools, similar project structure and the same design patterns. Making it easy for teams to help each other, re-use work and share knowledge.
                </Text>
                <Text p>
                    We empower our engineers to make reversible decisions, if they know a choice can be undone they don't need to get their approach validated. This encourages a flexible way of working and one way decisions are flagged so we can mitigate the risk.
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
                 Prioritize strategic work over tactical firefighting is key to success but in a startup, immediate issues can cloud your ability to think even a few weeks ahead. We were chasing ARR growth with a sales led approach which was not sustainable and bloating our product.
                </Text>
                <Text p>
                  So we made the conscious (and painful) decision to pause near-term sales activity so we could double down on foundational technical improvements. That short-term hit paid off—we're now operating at a higher quality and scale we need to support 10x more customers.
                </Text>
                <Text p>
                    We enacted the "kaizen initative", inspired by the Toyota term for "continuous improvement". This involved proactively identifying our largest bottlenecks and making plans to address them, then looking for the next bottleneck.
                </Text>
                <Text p>
                    <b>Challenges</b>
                </Text>
                <Text p>
                   We focused too much on scaling and technical improvements, after reviewing usage of our product we saw 50% of features were not contributing to revenue we needed, <b> So we deleted them.</b> By trimming back non-essential features, clarifying priorities, we could focus on increasing quality of our output. <b>Startups don’t starve—they drown.</b>
                </Text>
                <Text subtitle className="mt-10">Invest in the team</Text>
                <Image
                  className="my-5 float-right ml-5 mr-5"
                  src="/public/imp_assets/posts/first_year/ttsa.jpg"
                  alt="turn this ship around book"
                  caption="This book is a great read for anyone in a leadership role"
                  size={ImageSize.XS}
                />
                <Text p>
                    I believe <b>teams of people with good attitude beat teams with more experience and a bad attitude every time</b>. Passionate, humble engineers who communicate well can collaberate faster than a team of excellent individuals. That belief guided our hiring and mentoring practices all year.
                </Text>
                <Text p>
                    In our 1:1s, we put mentorship before status updates. We grew leaders from within, encouraged radical candor, and practiced healthy conflict resolution, <i>even around minor topics</i> so we’d be ready when the stakes were high.
                </Text>
                <Text p>
                    We embraced a <b>“leader-leader” model</b>: everyone gets ownership, everyone is trusted to lead and held accountable. The result? Autonomous teams that move faster and make better decisions.
                </Text>
                <Text p>
                    <b>Challenges</b>
                </Text>
                <Text p>
                    The biggest learning was we hired too fast as we initially expecting our product to grow but after reviewing with customers it we actually shrunk it. With a smaller product team effeciency dropped significantly and we had to make tough decisions, we lost some great engineers.
                </Text>

                <Image className="my-5" src="/public/imp_assets/posts/first_year/stay_the_course.png" alt="Stay the course description" size={ImageSize.MEDIUM} />

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
                    The strongest teams challenge each other with respect and with care. I have to remind myself this often and book monthly self reflection sessions with my CTO for us to both check in our weaknesses to ensure we are growing and not falling back into bad habits.
                </Text>
                <Text p>
                    One of my mentors told me that becoming a dad would help change me for the better and I agree, being a dad gives plenty of times to practice patience and empathy.
                </Text>
                <Seperator/>
                <Text p>
                    I feel incredibly fortunate to be at Ocula, working with such a talented, driven team. I’ve grown more this year than any before—technically, strategically, and personally.
                </Text>
                <Text p>
                    Do you work in a startup or with AI, what was your biggest learning?
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

