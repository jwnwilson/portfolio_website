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
                    Building a Dysfunctional Team.
                </Text>
                <Image className="my-5" src="/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp" alt="This is fine meme" caption="Look Better by making everyone else worse" size={ImageSize.SMALL} />
                <Text p>
                    Work hard, be a team player, build good products... <b>or</b> make yourself look better by making everyone else worse? What if we apply <LinkTo href="https://www.amazon.co.uk/Five-Dysfunctions-Team-Leadership-Lencioni-ebook/dp/B006960LQW" external className="underline">The 5 dysfunctions of a team</LinkTo> in reverse to sabotage the competition?
                    So in this post I'll attempt to bring out your inner monster and provide a step by step approach to systematically destroy your team while working towards your own goals and make yourself look great in comparison.
                </Text>
                <div className="md:flex items-center">
                    <div className="sm:w-100 md:w-1/2 ">
                        <Image
                            src="/public/imp_assets/posts/dysfunctional_team/5_dysfunctions_pyramid.jpg"
                            alt="The five dysfunctions pyramid"
                            caption="How to use this system against your team"
                            size={ImageSize.MEDIUM}
                        />
                    </div>
                    <div className="sm:w-100 md:w-1/2 m-5 flex-5 text-left">
                        <Text p>
                            This is the 5 dysfunctions pyramid, we will start from the bottom and work our way up, erroding the foundations of an effective team.
                        </Text>
                        <List type={ListType.number} className="mt-5">
                            <li><b>Trust</b></li>
                            <li><b>Conflict Resolution</b></li>
                            <li><b>Commitment</b></li>
                            <li><b>Accountability</b></li>
                            <li><b>Measuring Results</b></li>
                        </List>
                        <Text p>
                            We'll start with the first dysfunction <b>Trust</b>.
                        </Text>
                    </div>
                </div>
                <Seperator />
                <Text subtitle className="mt-10">
                    1. Destroy Trust
                </Text>
                <Image
                    src="/public/imp_assets/posts/dysfunctional_team/lion_king.webp"
                    alt="Scar and Mufasa from the Lion King"
                    caption="Scar from the Lion King managed to become king by building a dysfunctional team"
                    size={ImageSize.SMALL}
                />
                <Text p>
                    The foundations of a good team is trust, if teams trust their leaders and one another they can easily fix problems that could over time,
                    compond and become bigger issues. 
                </Text>
                <Text p>  
                    <b>Vulnerability is a building block for Trust</b>, if shown and nurtured it can spread across the team
                    and build a culture of shared learning and growth. Stamp out weakness by making people who show vulnerability uncomfortable, if 
                    you can use what they share against them even better. Don't offer your learnings and don't ask others what they could do better. 
                </Text>
                <Text p>
                    <b>Transparency can build trust</b>, don't show data behind decisions, if decisions are made without data that's ideal. 
                    If it's bad news you can pretend you're helping them by hiding it. People need to know what's going on and what's expected of them, keep them guessing. 
                </Text>
                <Text p>
                    <b>Following through on commitments</b> can encourage others to rely on you. Make sure to overcommit to problems so you don't have capcity to follow through, 
                    say yes to everything. Don't ask for help or pull others in if needed, you don't want to be seen as weak.
                </Text>
                <Text p>
                    <b>Don't get to know your team,</b> you might start to care about them and waste energy
                    helping them instead of yourself. Don't ask about their lives, don't ask about their families. Don't humanise your teammates, they are a means to an end. 
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                    2. Crush Ideological Debate
                </Text>
                <Image
                    src="/public/imp_assets/posts/dysfunctional_team/liz_truss.png"
                    alt="Liz Truss"
                    caption="Liz Truss became one of the UKs most successful Prime Ministers by not engaging in ideological debate."
                    size={ImageSize.SMALL}
                />
                <Text p>
                    If trust is still growing dispite your best efforts, discourage people from engaging directly in debate over different opinions. This usually results in a better outcome for the team and builds conflict resolution skills, here are some tips to avoid this.
                </Text>
                <List type={ListType.disc} className="mt-5">
                    <li>Build "us vs them" mentality to stunt discussion</li>
                    <li>Back channels over discussing directly can help make a situation worse</li>
                    <li>Don't try to understand the other person's perspective and objectives</li>
                    <li><b>Don't empathise with other people's challenges</b></li>
                    
                    <li>Shut down uncomfortable constructive discussion before resolution</li>
                    <li>Allow unproductive negative discussion to continue</li>
                </List>
                <Text p>
                    <b>The biggest risk for constructive debate is empathy as it can tempt you to compromise. Being empathetic to others also increases chances of them being receptive to your points.</b>
                </Text>
                <Text p>
                    Practice not listening to others, your spouse / partner, close friends or family are good targets, the less you feel, the better!
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                    3. Stunt Conflict Resolution Skills
                </Text>
                <div className="md:flex items-center">
                    <div className="sm:w-100 md:w-1/2">
                        <Image
                            src="/public/imp_assets/posts/dysfunctional_team/radical_candor.jpg"
                            alt="Radical Candor"
                            caption="Do not let people on your team read this book"
                            size={ImageSize.SMALL}
                        />
                    </div>
                    <div className="sm:w-100 md:w-1/2 m-5 flex-5 text-left">
                        <Text p>
                            Debate comes with conflict, <b>conflict resolution is the biggest risk for us now, if a team develops this skill it can be hard to stop them.</b> Teams
                            can then find ideal approaches to challenging situations. Recommendations for simmering conflict:
                        </Text>
                        <List type={ListType.disc} className="mt-5">
                            <li>Don't invite challenges from others, they might get into the habit of constructive conversation</li>
                            <li>Get defensive when challenged to discourage others challenging you again</li>
                            <li>Prioritising being "nice", avoid uncomfortable discussions instead of having them</li>
                            <li><b>The goal is to win the argument</b>, not solve a common problem or have a positive effect on the business</li>
                            <li>Get emotional and personal, <b>don't wait for emotions to pass for maximum damage</b></li>
                            <li>If emotions get the better of you <b>never apologise</b></li>
                        </List>
                    </div>
                </div>
                <Text p>
                    Avoid objective models like <LinkTo href="https://untools.co/situation-behavior-impact/" external className="underline">Situation Behaviour Impact</LinkTo> as they can remove the personal element from feedback.
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                    4. Avoid Commitment
                </Text>
                <Image
                    src="/public/imp_assets/posts/dysfunctional_team/runaway_groom.jpg"
                    alt="Run away groom"
                    caption="With creativity it's always possible to avoid commitment"
                    size={ImageSize.SMALL}
                />
                <Text p>
                    Now is time to decide and focus on your personal goals, if you're lucky they are not aligned with the team's so you can push in 
                    the wrong direction. If the team attempted to set a single goal that could unify them, you need to disrupt this. <b>A single, 
                    clear unifying goal risks uniting the team.</b> If a team does this it might be too late to out perform them.
                </Text>
                <Text p>
                    If the collective goal is not aligned with your personal goals, an lesser person might <b>disagree and commit. Sacrificing progress towards a personal goal for collective success.</b> This makes everyone
                    look good and will mean others will be more likely to help you in the future. 
                    If you are out numbered then agree but do the bare minimum, if you didn't engage in ideological debate this is easy.
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                    5. Encourage unaccountability
                </Text>
                <Image
                    src="/public/imp_assets/posts/dysfunctional_team/shaggy-it-wasnt-me.webp"
                    alt="Shaggy it wasn't me image"
                    size={ImageSize.SMALL}
                />
                <Text p>
                    If the team has a clear goal, in order to be successful, they need to be held accountable. This is our chance to encourage others to not 
                    do this. Don't <b>track and show the results of the goal you are committing to.</b> Don't 
                    <b> challenge others if you disagree and ask to see the results of their actions.</b> Massage numbers to looks good, hide mistakes, make
                    exceptions for yourself and avoid chances for the team to learn and improve. Lack of Vulnerability will help encourage the team to
                    not speak up about their mistakes and challenge others here.
                    
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                    6. Personal Success
                </Text>
                <Image
                    src="/public/imp_assets/posts/dysfunctional_team/wolf_wall_street.webp"
                    alt="Wolf on Wall Street"
                    caption="Now Chaos has taken hold, time to prioritise yourself."
                    size={ImageSize.SMALL}
                />
                <Text p>
                    <b>If the team is working to a collective goal and tracking it, it's probably too late.</b> So don't make collective results visible, deny 
                    learnings. Distract from the collective goal with your personal goals. Collect personal metrics, if you've focused on yourself they
                    should be higher than your colleagues, only talk about these.
                </Text>
                <Text p>
                    If you've followed this guide, <b>Congrats! The team should now be dysfunctional</b> and you should be the big fish in a small pond!
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                   Conclusion
                </Text>
                <Text p>
                    I hope you enjoyed my post on how to make your team dysfunctional, it was inspired by this post <LinkTo href="https://taylor.town/-10x.external" className="underline">How to be a -10x Engineer</LinkTo>. If
                    you want to learn how to build a high performing team, I recommend reading <LinkTo href="https://www.amazon.co.uk/Five-Dysfunctions-Team-Leadership-Lencioni-ebook/dp/B006960LQW" external className="underline">The 5 dysfunctions of a team</LinkTo> by Patrick Lencioni 
                    and <LinkTo href="https://www.radicalcandor.com/" external className="underline">Radical Candor</LinkTo> by Kim Scott.
                </Text>
                <Text p>    
                    I'd like to hear your thoughts, questions and feedback on this post, please leave a comment below.
                </Text>
                <Text p><b> - Noel</b></Text>
                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/blog/dysfunctional-team",
                        identifier: "dysfunctional-team",
                        title: "Building a Dysfunctional Team",
                        
                    }
                
                }></DiscussionEmbed>
                
            </div>
        </PageLayout>
    )
}

export default Article;

