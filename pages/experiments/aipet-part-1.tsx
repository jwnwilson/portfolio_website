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
                <Text p>
                    Check it out here! <LinkTo href="https://aipet.jwnwilson.co.uk/" external className="underline">aipet link</LinkTo>
                </Text>
                <Text p subtitle>
                    What is an Agent?
                </Text>
                <Text p>
                    Agentic AI is a bit of a buzzword at the moment, so this very basic agent is:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        This "agent" is a system prompt to make an LLM take on a specific role (Being a bunny). Then the agent logic maintains and passes context to the LLM requesting it to take action. The Agent has the ability to control the bunny pet's movement and actions. "
                    </Text>
                </div>
                <Text p>
                    We can also give the agent access to more tools which I intend to add as the pet becomes more sophisticated. I want to use a technique called MCP which will give the access to the scene directly. I am also going to look at multi-agent approach where the bunnies 
                    mind will have longer term goals and then shorter term goals powered by different LLMS and glued together.
                </Text>
                <Text p subtitle>
                    What technology am I using?
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <List type={ListType.disc}>
                        <li>Python</li>
                        <li>Pydantic AI</li>
                        <li>Pydantic Logfire</li>
                        <li>Django Ninja</li>
                    </List>
                    <List type={ListType.disc}>
                        <li>Typescript</li>
                        <li>React</li>
                        <li>Babylon.js</li>
                        <li>Google Gemini</li>
                    </List>
                </div>
                <Text p>
                    The AI pet is running on django ninja which feels like the best of fastapi and django. It provides auth, permissions and allows me to create async endpoints which is ideal for llm logic and also sync logic if needed.
                </Text>
                <Text p subtitle>
                    How does it work?
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_sequence.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                <Text p>
                    I had to enable auth as llms cost money and I wanted to keep track of usage. 
                    Once a user is authenticated the game will send scene data to the Django Ninja API and the Gemini LLM will return movement and actions for the pet. 
                    This happens periodically which is what makes the pet move around the scene and take actions.
                </Text>
                <Text p >
                    Here's the system prompt that gives the pet it's role and tells it how to provide return data
                </Text>
                <Image src="/public/imp_assets/posts/aipet/pydantic_01.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                <Text p>
                    Here's the prompt from the game which provides the scene data to the Gemini LLM
                </Text>
                <Image src="/public/imp_assets/posts/aipet/pydantic_02.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                <Text p>
                    Here's the response from the Gemini LLM
                </Text>
                <Image src="/public/imp_assets/posts/aipet/pydantic_03.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                <Text p>
                    This process happens on a loop to give the pet some basic agency, there are many more steps to take to make the pet more intelligent and interactive.
                </Text>
                <Text p subtitle>
                    Finally
                </Text>
                <Text p>
                    This is just the first step to get something working please check back for more updates in the future.
                    I didn't want to make a generic chat bot and who knows, if this develops enough it might turn into a fun game
                    I can develop into something more than a fun experiment. :)
                </Text>

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
