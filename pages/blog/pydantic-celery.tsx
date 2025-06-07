/**These are necessary imports / components for the page */
import { ImageSize, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";

const Article = () => {
    const { theme } = useTheme();
    return (
        <PageLayout standard>
            <div className='container px-3 pb-[20px]'>
                <div className="flex flex-col md:flex-row items-center">
                    <Image src="/public/imp_assets/posts/pydantic_celery/python_celery.jpeg" alt="Python Celery" size={ImageSize.XS} />
                    <div className="md:w-2/3 md:self-start mt-5">
                        <Text p>
                            I've been using both celery and pydantic for years and was looking for existing pydantic - celery integrations. I found some but was surpised to see that they weren't seamless. So I built on top of them and turned them into a 1 line integration.
                        </Text>
                        <Text p>
                            Here's the code if you want to skip the explanation:
                        </Text>
                        <LinkTo href="https://github.com/jwnwilson/celery_pydantic/" external className="underline">https://github.com/jwnwilson/celery_pydantic/</LinkTo>
                    </div>
                </div>
                <Text p>
                    First install the package:
                </Text>
                <div className="bg-slate-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`pip install celery_pydantic`}
                        </code>
                    </pre>
                </div>
                <Text p>
                    Then set it up like this:
                </Text>
                <div className="bg-slate-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`from celery import Celery
from celery_pydantic import pydantic_celery

# Create your Celery app
app = Celery('myapp', broker='amqp://')

# Configure the app to use Pydantic serialization
pydantic_celery(app)`}
                        </code>
                    </pre>
                </div>
                <Text p>    
                    Now you can use pydantic models as celery task arguments and return them from tasks.
                </Text>
                <div className="bg-slate-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

@app.task
def process_user(user: User):
    return user.name`}
                        </code>
                    </pre>
                </div>
                <Text p>
                    You can also return pydantic models from tasks.
                </Text>    
                <div className="bg-slate-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`@app.task
def process_user(user: User):
    return user

user: User = process_user.delay(User(name="John", age=30)).get()
`}
                        </code>
                    </pre>
                </div>
                <Text subtitle className="mt-10">
                    Under the hood
                </Text>
                <Text p>
                    The library is just one file with a serializer that hooks into celery's serialization, when a task is created we record the import path for pydantic models found in the args. When we run a task if the task data has pydantic class import path then it will dynamically load the pydantic model and parse the data.
                </Text>

                <Text subtitle className="mt-10">
                    Potential improvements
                </Text>
                <Text p>
                    I kept the json parsing default and it could be improved with a faster json parser like orjson or ujson.
                </Text>

                <Text subtitle className="mt-10">
                    Comparison with existing logic
                </Text>
                <Text p>
                    <LinkTo href="https://benninger.ca/posts/celery-serializer-pydantic/" external className="underline">This blog post</LinkTo> is the majority of the code above, but it requires registering each model manually, which I didn't want to do.
                </Text>
                <Text p>
                    <LinkTo href="https://github.com/celery/celery/blob/main/examples/pydantic/tasks.py" external className="underline">Celery's official Pydantic integration </LinkTo> only accepts plain dicts in arguments, not pydantic models. It also only returns dicts.
                </Text>
                <Text p>
                    You can also steal this file directly if you prefer:
                    <LinkTo href="https://github.com/jwnwilson/celery_pydantic/blob/main/celery_pydantic/serializer.py" external className="underline">https://github.com/jwnwilson/celery_pydantic/blob/main/celery_pydantic/serializer.py</LinkTo>
                </Text>
                <Text subtitle className="mt-10">
                    Let me know what you think
                </Text>
                <Text p>
                    Would love feedback and hope it's helpful.
                </Text>

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/blog/pydantic-celery",
                        identifier: "pydantic-celery",
                        title: "Seamless Pydantic-Celery Integration",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
