/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";

const Article = () => {
    const { theme }  = useTheme();
    return (
        <PageLayout home>
            <div className='container px-3 pb-[20px] pt-20 md:pt-10'>
                <Text title className="text-3xl">
                    Hiring the worst candidate.
                </Text>
                <Image className="my-5" src="/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp" alt="This is fine meme" caption="Look Better by making everyone else worse" size={ImageSize.SMALL} />
                <Text p>
                   Hiring is one of the most important things companies can spend your time doing, "Inspired" writen by Marty Cagan says that staffing is the most important thing you can do as a leader.
                   the right people reinforce good culture and great good quality. Most importantly they attract more great talent, a friend of mine once told me.
                   A players hire A players, B players hire C players.

                   Having interviewed dozens and hiring for multiple teams of engineers I'd like to share my experience on how to hire the worst candidate.

                    Attitude > Aptitude
                    Flexibility > Correctness
                    Product > Technology
                    Automation > Manual Process
                    Strategic > Tactical

                    Talent attracts talent.

                    Ask questions until they say I don't know, how they handle this is important.
                    Ideal candidates should see this as an opportunity to learn and be asking questions to take away and fill this knowledge gap



                </Text>
                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/blog/hiring-the-worst-candidate",
                        identifier: "worst-candidate",
                        title: "Hiring the worst candidate",
                        
                    }
                
                }></DiscussionEmbed>
                
            </div>
        </PageLayout>
    )
}

export default Article;

