import { iArticle } from "../src/shared/interfaces";

// Import author profiles, just type the name you have set in _BLOG_SETUP inside the curly brackets
import { NOEL } from "./_BLOG_SETUP";

// main article list to display all atricles
/**
 * Example article object
 * 
 {
    path: '/pages/tutorial/tutorial/how-to-setup-blog',
    featureArticle: true,
    preview: {
        // the author object you created in _BLOG_SETUP file
        author: MAYUR,
        date: "March 03 2022",
        articleTitle: "How to setup this plog template",
        tags: "demo, blog setup",
        thumbnail: "/images/tutorials/demo-image.jpg",
        shortIntro: "These are the steps to setup your blog",
    },
    seo: {
        title: "These are the steps to setup your blog",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        keywords: "demo, blog setup",
        ogImage: "/images/tutorials/demo-image.jpg",
        twitterHandle: "@mayur_nalwala",
    }
}
 */

// clear this article list and add your own
const ARTICLES_LIST: iArticle[] = [
  // {
  //   path: "/pages/tutorial/how-to-setup-blog.tsx",
  //   preview: {
  //     author: MAYUR,
  //     date: "August 08 2022",
  //     articleTitle: "How to setup this blog template",
  //     tags: "demo, blog setup",
  //     thumbnail: "/public/imp_assets/tutorials/how-to-setup-blog.svg",
  //     shortIntro: "These are the steps to setup your blog",
  //     category: "tutorial",
  //   },
  //   seo: {
  //     title: "How to setup this blog template",
  //     description: "These are the steps to setup your blog",
  //     keywords: "demo, blog setup",
  //     ogImage: "/public/imp_assets/tutorials/how-to-setup-blog.svg",
  //     twitterHandle: "@mayur_nalwala",
  //     author: MAYUR.name,
  //   },
  // },
  // {
  //   path: "/pages/tutorial/how-to-write-your-first-article.tsx",
  //   preview: {
  //     author: RUPALI,
  //     date: "August 08 2022",
  //     articleTitle: "How to write your first article",
  //     tags: "demo, first article",
  //     thumbnail: "/public/imp_assets/tutorials/how-to-write-first-article.svg",
  //     shortIntro:
  //       "This a step by step guide on how to write your first article.",
  //     category: "tutorial",
  //   },
  //   seo: {
  //     keywords:
  //       "demo, centered, centered layout, blog page layout, blog page design with centered layout, writing first article, webexpe, webexpe.com",
  //     ogImage: "/public/imp_assets/tutorials/how-to-write-first-article.svg",
  //   },
  // },
  // {
  //   path: "/pages/tutorial/how-to-deploy-blog.tsx",
  //   featureArticle: true,
  //   preview: {
  //     author: RUPALI,
  //     date: "August 08 2022",
  //     articleTitle: "How to Export and deploy on firebase",
  //     tags: "demo, deploy blog",
  //     thumbnail: "/public/imp_assets/tutorials/how-to-deploy.svg",
  //     shortIntro:
  //       "In this article you will see how to export blog files and what folder to deploy on your hosting.",
  //     category: "tutorial",
  //   },
  //   seo: {
  //     ogImage: "/public/imp_assets/tutorials/how-to-deploy.svg",
  //   },
  // },
  // {
  //   path: "/pages/tutorial/home-layout.tsx",
  //   preview: {
  //     author: RUPALI,
  //     date: "August 14 2022",
  //     articleTitle: "Home Layout Example",
  //     tags: "demo, layout, home layout",
  //     thumbnail: "/public/imp_assets/tutorials/home-layouts.svg",
  //     shortIntro: "In this article we will see Default Home Layout example.",
  //     category: "layouts",
  //   },
  //   seo: {
  //     title: "Home Layout Example",
  //     description: "In this article we will see Default Home Layout example.",
  //     keywords:
  //       "next js, tailwind css, typescript, blog template, default layout, default home layout",
  //     ogImage: "/public/imp_assets/tutorials/home-layouts.svg",
  //     author: RUPALI.name,
  //   },
  // },
  // {
  //   path: "/pages/tutorial/blog-with-sidebar-layout.tsx",
  //   preview: {
  //     author: MAYUR,
  //     date: "August 14 2022",
  //     articleTitle: "Page Layout for a article with sidebar",
  //     tags: "demo, with sidebar, default layout",
  //     thumbnail: "/public/imp_assets/tutorials/blog-with-sidebar-layout.svg",
  //     shortIntro:
  //       "In this article we will see Page Layout for a blog with sidebar example.",
  //     category: "layouts",
  //   },
  //   seo: {
  //     keywords:
  //       "demo, with sidebar, blog page layout, blog page design with sidebar, webexpe, webexpe.com",
  //     ogImage: "/public/imp_assets/tutorials/blog-with-sidebar-layout.svg",
  //   },
  // },
  // {
  //   path: "/pages/tutorial/blog-with-centered-layout.tsx",
  //   preview: {
  //     author: RUPALI,
  //     date: "August 14 2022",
  //     articleTitle: "Page Layout for a article with centered layout",
  //     tags: "demo, centered, centered layout",
  //     thumbnail: "/public/imp_assets/tutorials/blog-with-centered-layout.svg",
  //     shortIntro:
  //       "This a demo article with centered layout and with demo of all the components.",
  //     category: "layouts",
  //   },
  //   seo: {
  //     keywords:
  //       "demo, centered, centered layout, blog page layout, blog page design with centered layout, webexpe, webexpe.com",
  //     ogImage: "/public/imp_assets/tutorials/blog-with-centered-layout.svg",
  //   },
  // },
  // {
  //   path: "/pages/tutorial/all-components.tsx",
  //   preview: {
  //     author: RUPALI,
  //     date: "August 08 2022",
  //     articleTitle: "All Components",
  //     tags: "demo, all components",
  //     thumbnail: "/public/imp_assets/tutorials/all-components.svg",
  //     shortIntro: "List of all usable components, its types and how to use it.",
  //     category: "tutorial",
  //   },
  //   seo: {
  //     keywords: "demo, all components, webexpe, webexpe.com",
  //     ogImage: "/public/imp_assets/tutorials/all-components.svg",
  //   },
  // },
  // {
  //   path: "/pages/tutorial/style-guide.tsx",
  //   preview: {
  //     author: MAYUR,
  //     date: "August 10 2022",
  //     articleTitle: "Style Guide",
  //     tags: "demo, all components, style guide, styling tutorial",
  //     thumbnail: "/public/imp_assets/tutorials/style-guide.svg",
  //     shortIntro: "Styling and theming tutorial.",
  //     category: "tutorial",
  //   },
  //   seo: {
  //     keywords:
  //       "demo, all components, style guide, styling, css, tailwind css, tailwind, webexpe, webexpe.com",
  //     ogImage: "/public/imp_assets/tutorials/style-guide.svg",
  //   },
  // },
  // {
  //   path: "/pages/tutorial/icons.tsx",
  //   preview: {
  //     author: MAYUR,
  //     date: "August 13 2022",
  //     articleTitle: "How to use icons",
  //     tags: "demo, all components, style guide, styling tutorial, icons, how to use icons in website",
  //     thumbnail: "/public/imp_assets/tutorials/how-to-use-icons.svg",
  //     shortIntro: "How to use icons in your blog website.",
  //     category: "tutorial",
  //   },
  //   seo: {
  //     keywords:
  //       "demo, all components, style guide, styling, css, tailwind css, tailwind, webexpe, webexpe.com, styling tutorial, icons, how to use icons in website",
  //     ogImage: "/public/imp_assets/tutorials/how-to-use-icons.svg",
  //   },
  // },
  {
    path: "/pages/blog/dysfunctional-team.tsx",
    featureArticle: true,
    preview: {
      author: NOEL,
      date: "June 16 2024",
      articleTitle: "Building a Dysfunctional Team",
      shortIntro:
        "How to Build a Dysfunctional Team – Satirical Take on Team Leadership",
      tags: "team building, dysfunctional, satire",
      thumbnail: "/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp",
      category: "Stories",
    },
    seo: {
      keywords:
        "team building, dysfunctional, noel wilson, noel, software, development, engineer, software engineering, team",
      ogImage: "/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp",
    },
  },
  {
    path: "/pages/blog/first-year-as-vp-eng.tsx",
    featureArticle: true,
    preview: {
      author: NOEL,
      date: "April 2025",
      articleTitle: "Leading Engineering at an AI Startup",
      shortIntro:
        "What I learned in my first year as VP of Engineering at an AI startup",
      tags: "team building, engineering, management, leadership",
      thumbnail: "/public/imp_assets/posts/first_year/ship_stormy_sea.jpg",
      category: "Stories",
    },
    seo: {
      keywords:
        "team dysfunctions, how to ruin a team, toxic team behaviors, team building, leadership, noel wilson, noel, software, development, engineer, software engineering, team",
      ogImage: "/public/imp_assets/posts/first_year/ship_stormy_sea.jpg",
    },
  },
  {
    path: "/pages/experiments/pydantic-celery.tsx",
    featureArticle: false,
    preview: {
      author: NOEL,
      date: "June 07 2025",
      articleTitle: "Seamless Pydantic-Celery Integration",
      shortIntro:
        "I've been looking for existing pydantic - celery integrations and found some that aren't seamless so I built on top of them and turned them into a 1 line integration.",
      tags: "pydantic, celery, integration, python",
      thumbnail: "/public/imp_assets/posts/pydantic_celery/python_celery.jpeg",
      category: "Experiments",
    },
  },
  {
    path: "/pages/experiments/rive.tsx",
    featureArticle: false,
    preview: {
      author: NOEL,
      date: "July 19 2025",
      articleTitle: "Rive Experiment",
      shortIntro:
        "An experiment with adding advanced animations to a website.",
      tags: "rive, animations, typescript, react",
      thumbnail: "/public/imp_assets/posts/rive/rive.png",
      category: "Experiments",
    },
  }
  // {
  //   path: "/pages/blog/hiring-the-worst-candidate.tsx",
  //   featureArticle: true,
  //   preview: {
  //     author: NOEL,
  //     date: "October 20 2024",
  //     articleTitle: "Hiring the worst candidate",
  //     shortIntro:
  //       "Ensuring the competition is weak",
  //     tags: "team building, hiring, satire",
  //     thumbnail: "/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp",
  //     category: "Team Building",
  //   },
  //   seo: {
  //     keywords:
  //       "team building, dysfunctional, noel wilson, noel, software, development, engineer, software engineering, team",
  //     ogImage: "/public/imp_assets/posts/dysfunctional_team/this_is_fine.webp",
  //   },
  // },
];

export const SORTED_ARTICLES_BY_DATE = ARTICLES_LIST.sort((a, b) =>
  new Date(a.preview.date) > new Date(b.preview.date) ? -1 : 1
);
