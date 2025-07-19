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
            <div className='container px-3 pb-[20px] h-screen'>
                <RiveDemo />
            </div>
        </PageLayout>
    )
}

export default Article;
