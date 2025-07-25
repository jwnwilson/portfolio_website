/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-webgl2";

export const RiveDemo = () => {
    const { RiveComponent } = useRive({
        // Load a local riv `clean_the_car.riv` or upload your own!
        src: "bunny.riv",
        // Be sure to specify the correct state machine (or animation) name
        stateMachines: "State Machine 1",
        // This is optional.Provides additional layout control.
        layout: new Layout({
            fit: Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
            alignment: Alignment.Center,
        }),
        autoplay: true,
    });

    return <RiveComponent />;
};

const Article = () => {
    const { theme } = useTheme();
    return (
        <PageLayout standard>
            <div className='container px-3 pb-[20px]'>
                <div className="flex flex-col items-center justify-center h-[300px] md:h-[600px]">
                    <RiveDemo />
                    <Text className="text-sm" p>Hover mouse  over / touch the image to interact with it!</Text>

                </div>
                <Text subtitle className="mt-10">
                    Rive Animations
                </Text>
                <div className="flex flex-col md:flex-row items-start my-6">
                    <div className="md:w-1/4 w-full md:mr-6 mb-4 md:mb-0 flex-shrink-0 flex justify-center">
                        <LinkTo href="https://rive.app/" external className="underline">
                            <img
                                src="/imp_assets/posts/rive/rive.png"
                                alt="Rive Logo"
                                className="rounded-lg shadow-lg w-full md:w-auto"
                                style={{ maxWidth: 200 }}
                            />
                        </LinkTo>
                    </div>
                    <div className="md:w-2/3 w-full">
                        <Text p>
                            I've been looking at ways to make fancy animations on websites as a bit of a break from backend work and found <LinkTo href="https://rive.app/" external className="underline">Rive</LinkTo> which is great for this, so far I'm really impressed. It took me a couple of hours to: download the app, go through the tutorials, build this animation and deploy it to my website.
                        </Text>
                        <Text p>
                            Rive tries to mirror other animation tools like after effects. So if you've done that in the past then you'll feel right at home. It also has a state machine to allow user actions to control animations, which I used to add some interactions. I'll be playing with this more when I find time around the baby.
                        </Text>
                        <Text p>
                            Stay tuned for more experiments with Rive!
                        </Text>
                    </div>
                </div>

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/rive",
                        identifier: "rive",
                        title: "Rive Experiment",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
