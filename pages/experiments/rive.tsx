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
                <div className="flex flex-col items-center justify-center h-[400px]">
                    <RiveDemo />
                </div>
                <Text subtitle className="mt-10">
                    Rive Animations
                </Text>
                <Text p>
                    I've been looking at ways to make websites with fancy animations as bit of a break from backend work and found <LinkTo href="https://rive.app/" external className="underline">Rive</LinkTo> which is great for this. So far am really impressed, it took me a couple of hours to download go through the tutorials, build this animation and deploy it to my website.
                </Text>
                <Text p>
                It also has a state machine to allow user actions to control animations which I'd like to play with when I find time around the baby :).
                </Text>
                <Text p>
                    Stay tuned for more experiments with Rive!
                </Text>

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
