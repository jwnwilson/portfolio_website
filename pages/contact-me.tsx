/**These are necessary imports / components for the page */
import { PageLayout, Text } from "../src/components";
import { iSEO } from "../src/shared/interfaces";

const ContactUs = () => {
    const PAGE_SEO: iSEO = {
        title: 'Contact Me',
        description: 'Get in touch with Noel Wilson, Full Stack Engineer and Cloud Architect based in London.',
        keywords: 'noel wilson, contact, full stack engineer, cloud architect, london',
        author: 'Noel Wilson'
    }
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section className='container px-3 pb-10 md:pt-20 pt-[80px]'>
                <Text title className="!text-5xl !font-light">
                    Contact Me
                </Text>

                <div className="flex flex-wrap mt-8 justify-between">
                    <div className="md:w-1/2 w-full md:pl-2">
                        <Text p className="!text-lg leading-relaxed">
                            Feel free to reach out if you want to chat about software engineering, leadership, cloud architecture, or just want to say hello.
                        </Text>
                    </div>
                    <div className="md:w-1/3 w-full">
                        <Text p>
                            write to me at
                        </Text>
                        <Text subtitle className="!font-light md:!text-3xl">
                            jwnwilson@hotmail.co.uk
                        </Text>
                    </div>
                </div>
            </section>


            <section className={"dark:bg-slate-800 bg-blue-100 mt-10 container py-10 md:px-20 px-5"}>
                <Text subtitle className="md:!text-5xl text-4xl !font-light">
                    Work together . . .
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                    I am an experienced full stack engineer, cloud architect and engineering manager with 15+ years of industry experience. If you have any requirements or just want to connect, feel free to reach out via email or on LinkedIn.
                </Text>
            </section>
        </PageLayout>
    )
}

export default ContactUs
