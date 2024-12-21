import { LogoType, NavbarType } from "../src/shared/enums";
import { IAuthor, iNavSetup, iSEO } from "../src/shared/interfaces";
import { AiFillGithub, AiFillMail, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

/**
 * EXAMPLE AUTHOR
 * 
 export const AUTHOR_NAME: IAuthor = {
    name: "Full Name",
    designation: "Work Designation",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
     social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/'
        },
    ]
}
 */

export const NOEL: IAuthor = {
    name: "Noel",
    designation: "Software Engineer",
    bio: "I'm an experienced full stack engineer, cloud architect and engineering manager",
    profilePic: "/images/headshot_500.png",
    social: [
        {
            link: 'https://www.linkedin.com/in/noel-wilson-0a194225/',
            icon: <AiFillLinkedin />
        },
        {
            link: 'https://www.instagram.com/noelwilsonlon/',
            icon: <AiFillInstagram />
        }
    ]
}

export const MAYUR: IAuthor = {
    name: "Mayur Nalwala",
    designation: "Software Engineer",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
    social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/nmayur'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/in/mayur-nalwala/'
        },
    ]
}

export const RUPALI: IAuthor = {
    name: "Rupali Yadav",
    designation: "IT Analyst",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
    social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/rupali-yadav'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/in/rupali-yadav-087bb4112/'
        },
    ]
}


// This can your company name / your name etc for SEO purposes
export const WEBSITE_NAME: string = "Noel's Nonsense";
export const WEBSITE_URL: string = 'https://noel-wilson.co.uk';

/**
 * This is the main navigation setup.
 * This includes the main navbar and the side drawer.
 */
export const PRIMARY_NAV: iNavSetup = {
    type: NavbarType.DEFAULT,
    // max logo image height 40px
    // you can add logo light version if using image
    // logo: {
    //     type: LogoType.IMAGE,
    //     logo: '/images/logo.png',
    //     logoLight: '/images/logo-light.png'
    // },
    logo: {
        type: LogoType.TEXT,
        logo: "Noel's Nonsense",
    },
    // navLinks are the main navbar links that apper on top of every page
    navLinks: [
        {
            label: 'Home',
            path: '/'
        },
        {
            // for categories don't add path and add type: dropdown and pass path empty
            label: 'Blog',
            type: 'dropdown',
            path: ''
        },
        {
            label: 'About Me',
            path: '/about-me'
        }
        // {
        //     label: 'Contact Me',
        //     path: '/contact-me'
        // }
    ],
    // sideNavLinks are the links which appear when you open the side menu after clicking the burger menu icon.
    sideNavLinks: [
        {
            label: 'Home',
            path: '/'
        },
        {
            // for categories dont add path and add type: dropdown
            label: 'Blog',
            type: 'dropdown',
            path: ''
        },
        {
            label: 'About Me',
            path: '/about-me'
        }
    ],
    socials: [
        {
            link: 'https://www.linkedin.com/in/noel-wilson-0a194225/',
            icon: <AiFillLinkedin />
        },
        {
            link: 'https://www.instagram.com/noelwilsonlon/',
            icon: <AiFillInstagram />
        },
        {
            link: 'mailto:jwnwilson@hotmail.co.uk',
            icon: <AiFillMail />
        },
    ]
}

export const DEFAULT_SEO: iSEO = {
    title: "Noel's Nonsense",
    description: "Noel's Ramblings on Software Engineering, Leadership and Life.",
    keywords: "leadership, management, team, software, development, python, typescript, react, ",
    url: WEBSITE_URL,
    author: `${NOEL.name}`,
    twitterHandle: '',
    ogImage: '/public/images/headshot_500.png'
}