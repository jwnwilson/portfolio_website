/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { iSEO } from "../src/shared/interfaces";

const AboutUs = () => {
    const PAGE_SEO: iSEO = {
        title: 'About Me',
        description: `Hi I am Noel Wilson. This is my portfilio / blog website.`,
        keywords: 'noel wilson, noel, wilson, python, typescript, blog',
        author: 'Noel Wilson'
    }
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section className='container px-3 md:pb-20 md:pt-10 pt-20'>
                <a href="https://noel-wilson.co.uk/" target="_blank" rel="noopener noreferrer" className="block md:w-[15%] w-[50%] ">
                    <img src="/images/headshot.jpg" alt="noel wilson" className="rounded-lg overflow-hidden float-left mr-5" />
                </a>
                <div className="text">
                    <Text title className='mb-5 mt-10 dark:text-sky-400 text-sky-600'>
                        Hello, I'm Noel!
                    </Text>
                    <Text subtitle className='text-xl mb-5'>
                        I'm an experienced full stack engineer, cloud architect and engineering manager.
                    </Text>

                    <Text p className='text-lg'>
                        I have been working as an engineer / manager in London for over 15 years, worked end to end on various projects. I've built teams, web applications, APIs, event driven systems and data pipelines. I am an expert with technologies like Python, TypeScript, Terraform, Cloud Services and CI/CD platforms.
                    </Text>
                </div>

                <div className="flex flex-wrap justify-between">
                    <div className="md:w-auto w-full my-5">
                        <Text subtitle className='text-3xl font-medium'>
                            Skills
                        </Text>
                        <List type={ListType.disc}>
                            <li>Team building and Mentoring</li>
                            <li>Proficent with AWS, GCP and Azure</li>
                            <li>Cloud Architecture Specialist</li>
                            <li>APIs and event driven Architecture Specialist</li>
                            <li>Responsive UI Experience</li>
                        </List>
                    </div>

                    <div className="md:w-auto w-full my-5">
                        <Text subtitle className='text-3xl font-medium'>
                            Philosophy
                        </Text>
                        <List type={ListType.disc}>
                            <li>Attitude &gt; Aptitude</li>
                            <li>Flexibility &gt; Correctness</li>
                            <li>Product &gt; Technology</li>
                            <li>Automation &gt; Manual Process</li>
                            <li>Strategic &gt; Tactical</li>
                        </List>
                    </div>

                    <div className="md:w-auto w-full my-5">
                        <Text subtitle className='text-3xl font-medium'>
                            Weaknesses
                        </Text>
                        <List type={ListType.disc}>
                            <li style={{ transform: 'translate(0px, 0px) rotate(25deg)', transformOrigin: 'left' }}>CSS</li>
                            <li>Bad jokes</li>
                        </List>
                    </div>
                </div>
                <Seperator />
                <Text subtitle className='text-3xl font-medium'>
                    Location
                </Text>
                <Text p className='text-lg'>
                    I'm located in Essex near London and work mostly in London.
                </Text>
                <div className="px-4 py-3 dark:bg-slate-800 bg-blue-200 rounded my-5">
                    <Text p className="!text-lg leading-relaxed mb-0">
                        If you'd like to contact me please feel free to email me at: <u>jwnwilson@hotmail.co.uk</u>.
                    </Text>
                </div>
            </section>
        </PageLayout>
    )
}

export default AboutUs