/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider  } from "../src/components";
import { iSEO } from "../src/shared/interfaces";

const TermsAndConditions = () => {
    const PAGE_SEO: iSEO = {
        title: 'Privacy Policy',
        description: `This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in website`,
        keywords: 'noels nonsense, contact me',
        author: 'Mayur Nalwala, Rupali Yadav'
    }
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <div className='container px-3 pb-[20px] mt-10 pt-14 md:pt-0'>
                <Text title className="text-3xl">
                    Privacy Policy
                </Text>
                <Text p>
                    At noel-wilson.co.uk, accessible from noel-wilson.co.uk, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by noel-wilson.co.uk and how we use it. <br />
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact me. <br />
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in noel-wilson.co.uk. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Privacy Policy Generator.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Consent
                </Text>
                <Text p> 
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Information we collect
                </Text>
                <Text p> 
                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. <br />
                    If you contact me directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. <br />
                    When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    How we use your information
                </Text>
                <Text p> 
                    We use the information we collect in various ways, including to:
                    <ul className="list-disc pl-8">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                        <li>Send you emails</li>
                        <li>Find and prevent fraud</li>
                    </ul>
                </Text>
                <Seperator line />
                
                <Text subtitle className="text-xl">
                    Log Files
                </Text>
                <Text p>
                    noel-wilson.co.uk follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Cookies and Web Beacons
                </Text>
                <Text p>
                    Like any other website, noel-wilson.co.uk uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information. <br />
                    For more general information on cookies, please read "What Are Cookies".
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Google DoubleClick DART Cookie
                </Text>
                <Text p>
                    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Our Advertising Partners
                </Text>
                <Text p>
                    Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.

                    <ul className="list-disc pl-8">
                        <li>Google : https://policies.google.com/technologies/ads</li>
                    </ul>
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Advertising Partners Privacy Policies
                </Text>
                <Text p>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of noel-wilson.co.uk. <br />
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on noel-wilson.co.uk, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. <br />
                    Note that noel-wilson.co.uk has no access to or control over these cookies that are used by third-party advertisers.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Third Party Privacy Policies
                </Text>
                <Text p>
                    noel-wilson.co.uk's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. <br />
                    You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    CCPA Privacy Rights (Do Not Sell My Personal Information)
                </Text>
                <Text p >
                    Under the CCPA, among other rights, California consumers have the right to: <br /> Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. <br />Request that a business delete any personal data about the consumer that a business has collected. <br />Request that a business that sells a consumer's personal data, not sell the consumer's personal data. <br />If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact me.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    GDPR Data Protection Rights
                </Text>
                <Text p >
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: <br />
                    <ul className="list-disc pl-8">
                        <li>The right to access: You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                        <li>The right to rectification: You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                        <li>
                            The right to erasure: You have the right to request that we erase your personal data, under certain conditions.
                        </li>
                        <li>
                            The right to restrict processing: You have the right to request that we restrict the processing of your personal data, under certain conditions.
                        </li>
                        <li>
                            The right to object to processing: You have the right to object to our processing of your personal data, under certain conditions.
                        </li>
                        <li>
                            The right to data portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
                        </li>
                    </ul><br />
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact me.
                </Text>
                <Seperator line />
                <Text subtitle className="text-xl">
                    Children's Information
                </Text>
                <Text p >
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. <br />
                    noel-wilson.co.uk does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact me immediately and we will do our best efforts to promptly remove such information from our records.
                </Text>
            </div>
        </PageLayout>
    )
}

export default TermsAndConditions