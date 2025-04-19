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
                    First Year as a Manager of Managers
                </Text>
                <Image className="my-5" src="/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp" alt="This is fine meme" caption="Look Better by making everyone else worse" size={ImageSize.SMALL} />
                <Text p>
                    2025 Reflections as a VP of engineering in a startup with about 20 Engineers and Data scientists. Overal it's been a strong year where we've been able to solve
                    significant technical challanges to achieve our engineering goals:
                </Text>
                <List type={ListType.number} className="mt-5">
                    <li>Significantly reduce our data generation time by 95%</li>
                    <li>Increase the amount of customers we can support by 5x</li>
                    <li>Deploying inovative AI products that are producing some of the best output in a highly competitive market</li>
                    <li>Built a strong engineering culture and high performing team</li>
                </List>
                <Text subtitle>
                    Learnings
                </Text>
                <List type={ListType.number} className="mt-5">
                    <li>It's a marathon not a sprint</li>
                    <li>Invest in the team</li>
                    <li>Flexibility and consistency over correctness</li>
                    <li>Stay the course</li>
                </List>
                <Image className="my-5" src="/public/imp_assets/posts/first_year/urgent_imporatant_matrix.webp" alt="urgent important matrix" caption="Consistent effort to stay in Q2" size={ImageSize.SMALL} />

                <Text subtitle className="mt-10">It's a marathon not a sprint</Text>
                <Text p>
                    One of my of my guiding principles is prioritise strategic work over tactical. Immediate challenges can sometimes make it hard to
                    see into next month or next quarter. Prioritising medium term work specificially benefits the companies long term goals
                    can and upward spiral increasing over time. We had to accept short term pain of reducing sales to give us
                    time to do this and were lucky to have a supportive leadership team to enable this.
                    Reduce, simplify and remove where possible, <b>startups don't starve they drown.</b> Remove projects and work that doesn't contribute to
                    the companies goals.
                    Simple plans are more likely to succeed, save mental energy for the important things.
                </Text>
                <Text subtitle className="mt-10">Invest in the team</Text>
                <Text p>
                    I believe in attitude over attitude, people who are passionate about technology are easy to train to be highly skilled. Bad attitude is difficult to fix and 
                    even with high output can work against the team. We hired passionate people who showed humility and strong communication skills, we invested time into mentoring and growing them.
                </Text>
                <Text p>
                    We prioritise mentoring and learning in our 1:1s to grow our leaders, it's easy to get lost in status updates. 
                    <b>As a result teams became autonomous and more effective over time.</b>
                     Part of this mentorship was embracing radical candar, all leaders had to practice how to navigate conflict in a healthy way. We even practiced this with unimporatnt issues
                    so we can have difficult conversations effectively when they matter.
                <Text p>
                    We have adopted the "leader leader" approach, we give ownership to people and treat them like leaders, inspiring them to do the same to others creating a chain
                    effect of accountability and ownership.
                </Text>
                <Text subtitle>
                    Flexibility and consistency over correctness
                </Text>
                <Text p>
                    One of my key responsibilities is to enable technology to meet the needs of the business, this means being flexible and adaptable to change over building the perfect system.
                    We have adopted hexagonal architecture to allow us to quickly make major changes to our system without having to rewrite everything. We have followed domain driven design
                    to break up our business problems into verticles to allow teams to work quickly and independantly.
                    It's better to be consistently incorrect than inconsistently correct, all our teams use the same technology and architecture to allow us to have flexible teams, enable rapid knowledge transfer across teams.
                    We prioritise reversable decisions when deciding how to build software.
                </Text>
                <Text subtitle>
                    Stay the course
                </Text>
                <Text p>
                    In an AI driven agile world it's tempting to change priorities quickly and often but commiting 100% to the 2nd or 3rd best options will often
                    yield better results than putting 50% effort into the best option. We learned this the hard way when we tried to pivot too quickly and ended up with a half baked solution that didn't meet our needs.
                    We ended up having to roll back changes and would have been better to stick with the original plan.

                    Now when we get new learnings from customers we give teams time to work that into current work and then we review the plan. This results in teams
                    not losing momentum and being agile enough to adapt when necessary. It also gives time for us to solidify the new approach and find edge cases that
                    might invalidate it before the team starts working on it.
                <Text subtitle>
                    Overall
                </Text>
                </Text>   
                    
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

