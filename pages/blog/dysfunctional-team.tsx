/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";
import { Article_Entry_inList } from "../../src/constants/codeBlocks";

const Article = () => {
    return (
        <PageLayout home>
            <div className='container px-3 pb-[20px] md:mt-[50px] pt-20 md:pt-0'>
                <Text title className="text-3xl">
                    Building a Dysfunctional Team.
                </Text>
                {/* <div className="dark:bg-slate-800 bg-blue-200 m t-5 rounded px-3 py-2">
                    <i>
                        *note: All the files you will create or interact with are in
                    </i>
                    <List type={ListType.disc} className="mt-5">
                        <li><b>BLOG_CONSTANTS folder : </b> inside this we have our _BLOG_SETUP.tsx file where we set our authors, navbar and other details and we have _ARTICLES_LIST.tsx file where we maintain our article list.</li>
                        <li><b>blog folder : </b> Inside this we will create out blog files or sub folders for your article files like this current file is in {'pages -> blog -> tutorial'}</li>
                        <li><b>images folder : </b> In this we will save all our images to use in the articles, like the og-image.jpg file is stored in {'public -> images'} folder.</li>
                    </List>
                </div> */}
                <Image className="my-5" src="/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp" alt="This is fine meme" caption="Look Better by making everyone else worse" size={ImageSize.SMALL} />
                <Text p>
                    You could work hard, be a team player, build good products... <b>but is there an easier way?</b> What if I told you there was a way to make yourself look better by making everyone else worse? What if you actually put the 5 dysfunctions of a team in reverse to come out ahead?
                </Text>
                <Text p>
                    So in this blog I'll attempt to bring out your inner monster and provide a step by step approach to systematically destroy your team while working towards your own goals to come out ahead.
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
                            First we have to lower the bar so it's easier to jump over, this is the 5 dysfunctions pyramid. The idea is to start from the bottom and work your way up.
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
                    alt="Scar and Mufassa from the Lion King"
                    caption="Scar from the Lion King managed to become king by building a dysfyunctional team"
                    size={ImageSize.SMALL}
                />
                <Text p>
                    Vulnerability is a building block for Trust, <b>sharing your mistakes shows vulnerablility and risks giving the teams oppurtinities to learn from them.</b> They might be encouraged to also do
                    the same, building a culture of shared learning and growth. Shut down honest reflection, don't ask others what they could do better, they should already know. Vulnernability is weakness, you need to be the alpha. You need to be the one that everyone fears.
                </Text>
                <Text p>
                    <b>Be an enigma, transparency can build trust</b>, hide discussions and decisions you're in from the team. If it's bad news you can pretend you're helping them by not telling anyone.
                    People like to know what's going on and what's expected of them, they have to earn that right.
                </Text>
                <Text p>
                    Say one thing, do another. This will keep your team mates on their toes and they'll never know what to expect. Don't worry about overcommitting, say yes to everything and maximise the chances of letting the team down. 
                    Be aware! <b>Showing your words and actions carry weight can make others feel like they can rely on you.</b> If the sitatutation changes don't update the team, they should be able to read your mind.
                </Text>
                <Text p>
                    Don't humanise your teammates, they are a means to an end. <b>Don't get to know them, don't ask about their lives, don't ask about their families.</b> You might start to care about them and waste energy helping them instead of yourself.
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
                    <li><b>Build "us vs them" mentality to stunt discussion</b></li>
                    <li><b>Back channels over discussing directly can help make a siutation worse</b></li>
                    <li><b>Don't try to understand the other person's perspective and objectives</b></li>
                    <li><b>Don't empathise with other people's challanges, you'll be tempted to compromise</b></li>
                    <li><b>Prioritising being nice over having uncomfortable discussions</b></li>
                    <li><b>Shut down uncomfortable discussion before resolution</b></li>
                </List>
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
                            <b>Conflict resolution is the biggest risk for us now, if a team develops this skill it can be hard to stop them.</b> Teams can then find ideal approaches to challenging siutations. Recommendations when debating:
                        </Text>
                        <List type={ListType.disc} className="mt-5">
                            <li>Don't invite challenges from others, they might get into the habit of constructive conversation</li>
                            <li>Get defensive when challenged to discourage others challenging you again</li>
                            <li><b>The goal is to win the argument</b>, not influence the other person or have a positive effect on the business</li>
                            <li>Don't acknowledge the other person's feelings, <b>empathy increase chances of someone being receptive to your points</b></li>
                            <li>Get emotional and personal, <b>don't wait for emotions to pass for maximum damage</b> when challenging</li>
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
                    Now is time to decide and focus on your personal goals, if you're lucky they are not aligned with the team's so you can push in the wrong direction. 
                    If the team attempted to set a single goal that could unify them, you need to disrupt this. <b>A single, clear unifying goal risks the team committing 100% to it.</b> If a team does this it might be too late to out perform them.
                </Text>
                <Text p>
                    Refuse to disagree and commit, don't sacrifice personal success for collective success. If you are out numbered then agree but do the bare minimum, if you didn't engage in ideological debate this is easy.
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
                    If the team has a clear goal, the best you can do is encourage others to not hold themselves accountable. <b>Don't challenge others if you disagree, don't engage in difficult conversations.</b> Hide mistakes, make exceptions for yourself and avoid chances for the team to learn and improve. <b>Lack of Vulnerability will help here.</b>
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
                    <b>If the team is working to a collective goal it's probably too late.</b> So don't make collective results visible, deny learnings. Distract from the collective goal with you personal goals.
                    Collect personal metrics, if you've focused on yourself they should be higher than your colleagues, only talk about these.
                </Text>
                <Text p>
                    If you've followed this guide, Congrats! The team should now be dysfunctional and you should be the big fish in a small pond!
                </Text>
            </div>
        </PageLayout>
    )
}

export default Article;