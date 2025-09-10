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
                            What is this Project?
                        </Text>
                        <Text p>
                            To expore agentic AI and to see what is possible I've been working on an AI pet that is fully controlled by AIs / LLMs. I've created is a 3D browser game with a 2D "pet"
                            bunny that currently has basic needs: hunger, tiredness, boredom and toilet. The AI agent is told to take the role of the pet and will control the bunny in the game. 
                        </Text>
                        <Text p>
                            Here's a link to the demo which is currently publically available: <LinkTo href="https://aipet.jwnwilson.co.uk/" external className="underline">aipet link</LinkTo>
                        </Text>
                    </div>
                </div>
                <Text p subtitle>
                    What is an Agent?
                </Text>
                <Text p>
                    Agentic AI is a bit of a buzzword at the moment, so this very basic agent is:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <Text p>
                        This "agent" is a system prompt given to an LLM take on a specific role (Being an AI pet). Then the agent logic in my application stores, maintains and sends context to the LLM when we request it to take action. The Agent returns a response that controls the bunny pet's movement and actions. "
                    </Text>
                </div>
                <Text p>
                    Right now the pet is very basic, I want to give it access to more tools as I develop it. Currently scene state is on the browser but I want to move this to the server so I can enable multiplayer. I am also going to look at multi-agent approach where the bunnies 
                    mind will have longer term goals and then shorter term goals powered by different LLMS and aggregated together.
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
                    The AI pet is running on <LinkTo href="https://django-ninja.dev/" external className="underline">Django Ninja</LinkTo> which feels like the best of FastAPI and Django. 
                    It provides auth, permissions which I will need later to lock down the app as I'm currently using free tier Gemini. 
                    It also allows me to create async endpoints which is ideal for LLM logic as it is I/O bound not CPU or memory bound.
                </Text>
                <Text p subtitle>
                    Initial Idea
                </Text>
                <Image src="/public/imp_assets/posts/aipet/aipet_sequence.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                <Text p>
                    This is what I initially tried and it didn't really work as expected. I setup auth as llms cost money and track usage with pydantic logfire, although I've disabled auth for now while on free tier for LLMs. 
                    Once a user is authenticated the game will send scene data to the Django Ninja API and the Gemini LLM will return movement and actions for the pet. 
                    This happens periodically which is what makes the pet move around the scene and take actions.
                </Text>
                <Text p >
                    Here's the system prompt I tried to give the pet it's role and tells it how to provide return data
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
                    This process happens on a loop to give the pet some basic agency, the problem with this approach is the LLM doesn't do maths, at least the fast cheap models I want to use don't.
                    This is because LLMs are predictive text on steriods, so it would sometimes return the position of where it wanted to go instead of a movement direction.
                    So my AI pet would often get stuck in a corner and not be able to move.
                </Text>
                <Text p subtitle> Next Iteration</Text>
                <Image src="/public/imp_assets/posts/aipet/pydantic_04.png" alt="AI Pet" size={ImageSize.MEDIUM} />
                <Text p>
                    The version at time of writing I changed the prompt to return a desired location the pet wants to go and an action, as the LLM can return positions from the scene data this works
                    much better! I get back the desired location and calculate the movement on the server using the pet position and the desired location. The movement is very direct though so I'm thinking
                    of having the LLM return a way to inflence how the pet moves with speed, jumping or some other variety.
                </Text>
                <Text p subtitle>
                    Learnings
                </Text>
                <Text p>
                    I'm enjoying using LLMs for what they are good at, LLMs are predictive text on steriods so they are good for creative projects where accuracy is not critical. They are good at 
                    taking on a "role" and returning a creative response using data it has been given. Currently they tend to be bad at being specific due to hallucinations introduced by it's random nature. 
                    Unless you're using an expensive LLM, they also struggle with maths. 
                </Text>
                <Text p>
                    This is just the first step to get something working, my next steps involve investigating.
                </Text>
                <List type={ListType.disc}>
                    <li>More interesting movement</li>
                    <li>Multiplayer - multiple users interacting with the same pet</li>
                    <li>More actions for the ai pet</li>
                    <li>User interactions with the ai pet</li>
                </List>
                <Text p>
                    If you have any ideas or suggestions I'd live to hear them below!
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
