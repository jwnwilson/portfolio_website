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
                    <Image src="/public/imp_assets/posts/pydantic_celery/python_celery.jpeg" alt="Python Celery" size={ImageSize.XS} />
                    <div className="w-full md:w-2/3 md:self-start mt-5">
                        <Text p>
                            I've been using both celery and pydantic for years and was looking for existing pydantic - celery integrations. I found some but was surpised to see that they weren't seamless. So I built on top of them and turned them into a 1 line integration.
                        </Text>
                        <Text p>
                            Here's the code if you want to skip the explanation:
                        </Text>
                        <LinkTo href="https://github.com/jwnwilson/celery_pydantic/" external className="underline">github link</LinkTo>
                        <Text p className="mt-4">
                            You can also steal this file directly if you prefer: 
                        </Text>
                        <LinkTo href="https://github.com/jwnwilson/celery_pydantic/blob/main/celery_pydantic/serializer.py" external className="underline">serializer.py</LinkTo>
                    </div>
                </div>
                <Text p>
                    First install the package:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`pip install celery_pydantic`}
                        </code>
                    </pre>
                </div>
                <Text p>
                    Then set it up like this:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
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
                    Now you can use pydantic models as celery task arguments.
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

@app.task
def process_user(user: User):
    return user.name

process_user.delay(user=User(name="John", age=30))
`}
                        </code>
                    </pre>
                </div>
                <Text p>
                    You can also return pydantic models from tasks.
                </Text>    
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`@app.task
def process_user(user: User):
    return user

user: User = process_user.delay(user=User(name="John", age=30)).get()
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
                    <LinkTo href="https://github.com/celery/celery/blob/main/examples/pydantic/tasks.py" external className="underline">Celery's official Pydantic integration </LinkTo> requires pydantic models to be converted to dicts using model_dump(). This
                    will also error if you have types that don't work with the default json serializer such as `UUID`, `datetime`, etc. In the end it looks something like this:
                </Text>
                <div className="bg-slate-800 dark:bg-slate-200 text-gray-100 dark:text-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                    <pre>
                        <code>
                            {`@app.task(pydantic=True)
def process_user(user: User):
    return user.name

process_user.delay(user=json.loads(User(name="John", age=30).model_dump_json()))
`}
                        </code>
                    </pre>
                </div>
                <Text p>This works too if you prefer to keep things simple.</Text>
                <Text subtitle className="mt-10">
                    Let me know what you think
                </Text>
                <Text p>
                Do you know a better way to solve this? I'd love to hear your thoughts and learn more!
                </Text>

                <DiscussionEmbed key={theme} shortname="noel-wilson-co-uk-1" config={
                    {
                        url: "https://noel-wilson.co.uk/experiments/pydantic-celery",
                        identifier: "pydantic-celery",
                        title: "Seamless Pydantic-Celery Integration",
                    }
                }></DiscussionEmbed>
            </div>
        </PageLayout>
    )
}

export default Article;
