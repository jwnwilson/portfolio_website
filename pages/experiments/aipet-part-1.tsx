/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";

const Article = () => {
    const { theme } = useTheme();
    return (
        <PageLayout standard>
            <div className='container max-w-4xl px-3 pb-[20px]'>
                <div className="flex flex-col md:flex-row items-center">
                    <Image src="/public/imp_assets/posts/aipet/aipet.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                    <div className="w-full md:w-2/3 md:self-start mt-5 ml-5">
                        <Text p subtitle>
                            What is an AI Pet?
                        </Text>
                        <Text p>
                            To learn more about AI and to see what is possible I've been working on an AI pet that is fully controlled by Agentic AIs. This is a 3D browser game with a 2D "pet"
                            bunny that currently has basic needs: hunger, tiredness, boredom and toilet. The AI agent is told to take the role of the pet and will control the bunny in the game. 
                        </Text>
                    </div>
                </div>
                <Text p subtitle>
                    What is an Agent?
                </Text>
                <Text p>
                    Agentic AI is a bit of a buzzword at the moment so this very basic agent is:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        This "agent" is a system prompt to make an LLM specific to a certain task (Being a bunny). Then maintaining and passing context to the LLM when giving a task so it can return better answers."
                    </Text>
                </div>
                <Text p>
                    We can also give the agent access to more tools which I intend to add as the pet becomes more sophisticated using a technique called MCP. I am also going to look at multi-agent approach where the bunnies 
                    mind will have longer term goals and then shorter term goals powered by different LLMS and glued together.
                </Text>
                <Text p subtitle>
                    What technology am I using?
                </Text>
                <Text p subtitle>
                    How does it work?
                </Text>
                <Text p>
                    The game will send scene data to the LLM and let the LLM return movement and actions for the pet. This is a very simple example of an Agentic AI.
                </Text>
                <Text p>
                    I've deployed it to the link below, reach out to me for login details if you'd like to try it out!
                </Text>
                <LinkTo href="https://aipet.jwnwilson.co.uk/" external className="underline">aipet link</LinkTo>

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/aipet-part-1",
                        identifier: "aipet-part-1",
                        title: "AI Pet - Part 1",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
