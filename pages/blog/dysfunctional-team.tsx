/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";

const Article = () => {
    const { theme }  = useTheme();
    return (
        <PageLayout standard>
            <div className='container px-3 pb-[20px]'>
                <Text subtitle>
                    Don't work on yourself, just make everything else worse
                </Text>
                <Image className="my-5" src="/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp" alt="This is fine meme" size={ImageSize.SMALL} />
                <Text p>
                    Want to be the top dog without actually being good at your job? 
                </Text>
                <Text p>
                    Then I'll show you how to apply <LinkTo href="https://www.amazon.co.uk/Five-Dysfunctions-Team-Leadership-Lencioni-ebook/dp/B006960LQW" external className="underline">The 5 dysfunctions of a team</LinkTo> to sabotage the competition.
                    With this post I'll attempt to bring out your inner monster and provide a step by step approach to systematically destroy your team while working towards your own goals, so you look great in comparison.
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
                <div className="flex flex-col md:flex-row items-center">
                    <Image
                        src="/public/imp_assets/posts/dysfunctional_team/lion_king.webp"
                        alt="Scar and Mufasa from the Lion King"
                        caption="Scar from the Lion King had the right idea"
                        size={ImageSize.SMALL}
                        className="md:w-1/2 md:mr-5"
                    />
                    <div className="md:w-1/2">
                        <Text p>
                            The foundations of a good team is trust, if teams trust their leaders and one another they can easily fix problems that could over time,
                            compound and become bigger issues. 
                        </Text>
                        <Text p>  
                            <b>Vulnerability is a building block for Trust</b>, if people can share their failures then others can learn from them,
                            this can encourage a culture of shared learning and growth. Stamp out weakness by making people who show vulnerability uncomfortable, 
                            berating mistakes is an excellent way to do this.
                        </Text>
                    </div>
                </div>
                <Text p>
                    <b>Transparency can build trust</b>, don't show data behind decisions, if decisions are made without data that's ideal. 
                    If it's bad news, hide it until the situation gets worse. People need to know what's going on and what's expected of them, keep them guessing. 
                </Text>
                <Text p>
                    <b>Following through on commitments</b> can encourage others to rely on you. Make sure to overcommit to problems so you don't have capacity to follow through, 
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
                <div className="flex flex-col md:flex-row items-center">
                    <Image
                        src="/public/imp_assets/posts/dysfunctional_team/liz_truss.png"
                        alt="Liz Truss"
                        caption="Liz Truss became one of the UKs most successful Prime Ministers by not engaging in ideological debate."
                        size={ImageSize.SMALL}
                        className="md:w-1/2 md:mr-5"
                    />
                    <div className="md:w-1/2">
                        <Text p>
                            If trust is still growing despite your best efforts, discourage people from engaging directly in debate over different opinions. This usually results in a better outcome for the team and builds conflict resolution skills, here are some tips to avoid this.
                        </Text>
                        <List type={ListType.disc} className="mt-5">
                            <li>Build "us vs them" mentality to stunt discussion</li>
                            <li>Back channels over discussing directly can help make a situation worse</li>
                            <li>Don't try to understand the other person's perspective and objectives</li>
                            <li>Don't empathise with other people's challenges</li>
                            <li>Shut down uncomfortable constructive discussion before resolution</li>
                            <li>Allow unproductive negative discussion to continue</li>
                        </List>
                    </div>
                </div>
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
                    <div className="sm:w-100 md:w-1/3">
                        <Image
                            src="/public/imp_assets/posts/dysfunctional_team/radical_candor.jpg"
                            alt="Radical Candor"
                            caption="Do not let people on your team read this book"
                            size={ImageSize.SMALL}
                            maxHeight="300px"
                        />
                    </div>
                    <div className="sm:w-100 md:w-2/3 m-5 flex-5 text-left">
                        <Text p>
                            Debate comes with conflict, <b>conflict resolution is the biggest risk for us now, if a team develops this skill it can be hard to stop them.</b> Teams
                            can then find ideal approaches to challenging situations. Recommendations for simmering conflict:
                        </Text>
                        <List type={ListType.disc} className="mt-5">
                            <li>Don't invite challenges from others, they might get into the habit of constructive conversation</li>
                            <li>Get defensive when challenged to discourage others challenging you again</li>
                            <li>Avoid uncomfortable discussions that need to be had, instead of having them</li>
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
                <div className="md:flex items-center">
                    <div className="sm:w-100 md:w-1/2">
                        <Image
                            src="/public/imp_assets/posts/dysfunctional_team/runaway_groom.jpg"
                            alt="Run away groom"
                            caption="With creativity it's always possible to avoid commitment"
                            size={ImageSize.SMALL}
                        />
                    </div>
                    <div className="sm:w-100 md:w-1/2 m-5 flex-5 text-left">
                        <Text p>    
                            <b>A single, clear unifying goal risks uniting the team,</b> having everyone working to help the business or product achieve a specific outcome and committing to it
                            risks the entire team being successful.
                        </Text>
                        <Text p>
                            So instead, now is time to decide and focus on your personal goals, prioritise what's best for you! A good model is CDD (CV driven development). 
                            Prioritise technologies you're interested in that will help you on your next role, if you're not sure what to pick then it's always a good time to implement kubernetes!
                        </Text>
                    </div>
                </div>
                <Text p>
                    A common way successful teams unite is for some people to <b>disagree and commit to a solution. Alignment doesn't mean agreement</b> but this
                    means sacrificing progress towards a personal goal for collective success, so how we do avoid this?
                    If you are outnumbered then agree but do the bare minimum, if you didn't engage in ideological debate this is easy.
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                    5. Encourage unaccountability
                </Text>
                <Text p>
                    If the team has a clear goal, in order to be successful, they need to be held accountable.
                </Text>
                <Text> 
                    Teams usually do this by tracking projects with data, here's some tips to interfere. 
                </Text>
                <List type={ListType.disc} className="mt-5">
                    <li>Make the data hard to access, dev ops and sec ops are useful if you can argue it's sensitive data</li>
                    <li>If data is tracked try to ensure it's not related to team goals</li>
                    <li>Don't challenge others if you disagree and ask to see the results of their actions.</li>
                    <li>Massage numbers to look good, hide mistakes, make exceptions for yourself</li>
                </List>
                <Text p>
                    Finally don't <b>hold yourself accountable</b>, if you do this then others will too. If you make a mistake, don't own up to it, blame others.
                    If you made a decision, don't take responsibility for it, blame the team.
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
                    If you've followed this guide, you should have your own project (a.k.a. a sweet kubernetes cluster) up by now to wow your next employer and your team mates should 
                    be busy chasing their tails.
                </Text>
                <Text p>
                    This isn't specific to this guide but keep a brag list with all your personal acomplishments, feel free to exaggerate your personal contributions to 
                    teams. Focus on your personal achievements though just incase an employer asks for specifics on what you contributed to the team, this happens and it's 
                    embarrassing to be caught out!
                </Text>
                <Text p>
                    If you've followed this guide, <b>Congrats! The team should now be dysfunctional</b> and you should be the big fish in a small pond!
                </Text>
                <Seperator />
                <Text subtitle className="mt-10">
                   Conclusion
                </Text>
                <Text p>
                    I hope you enjoyed my post on how to make your team dysfunctional, it was inspired by this post <LinkTo href="https://taylor.town/-10x" className="underline">How to be a -10x Engineer</LinkTo>. If
                    you want to learn how to build a high performing team, I recommend reading <LinkTo href="https://www.amazon.co.uk/Five-Dysfunctions-Team-Leadership-Lencioni-ebook/dp/B006960LQW" external className="underline">The 5 dysfunctions of a team</LinkTo> by Patrick Lencioni 
                    and <LinkTo href="https://www.radicalcandor.com/" external className="underline">Radical Candor</LinkTo> by Kim Scott.
                </Text>
                <Text p>    
                    Know someone who could benefit from these shortcuts? Share this with them 😉.
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

