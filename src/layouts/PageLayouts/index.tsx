import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { DEFAULT_SEO, WEBSITE_URL } from '../../../BLOG_CONSTANTS/_BLOG_SETUP';
import JsonLd from '../../components/JsonLd';
import Navbar from '../../components/Navbar';
import { iSEO } from '../../shared/interfaces';
import { buildBlogPostingSchema, buildPersonSchema } from '../../utils/schemas';
import { CREATE_SEO_CONFIG, getArticleDetails } from '../../utils/utils';
import Centered from './BlogCentered';
import WithSidebar from './BlogWithSidebar';
import HomeLayout from './HomeLayout';
import StandardLayout from './StandardLayout';

interface IBlogLayout {
    children: any
    PAGE_SEO?: iSEO,
    blogwithsidebar?: boolean;
    blogcentered?: boolean;
    home?: boolean;
    standard?: boolean;
    ads?: string[];
}

const PageLayout = ({ children, PAGE_SEO, blogwithsidebar = false, blogcentered = false, home = false, standard = false, ads = [] }: IBlogLayout) => {
    const router = useRouter();
    const ARTICLE_DETAILS = getArticleDetails();
    const isHomePage = router.asPath === '/';
    const pageUrl = `${WEBSITE_URL}${router.asPath}`;

    let SEO_CONFIG = {};
    if (ARTICLE_DETAILS && ARTICLE_DETAILS.seo) {
        SEO_CONFIG = CREATE_SEO_CONFIG({ ...ARTICLE_DETAILS.seo })
    } else if (PAGE_SEO) {
        SEO_CONFIG = CREATE_SEO_CONFIG({ ...DEFAULT_SEO, ...PAGE_SEO })
    } else {
        SEO_CONFIG = CREATE_SEO_CONFIG({ ...DEFAULT_SEO })
    }

    return (
        <>
            <NextSeo {...SEO_CONFIG} />
            {isHomePage && (
                <JsonLd schema={buildPersonSchema()} keyId="jsonld-person" />
            )}
            {ARTICLE_DETAILS && (
                <JsonLd
                    schema={buildBlogPostingSchema(ARTICLE_DETAILS, pageUrl)}
                    keyId="jsonld-article"
                />
            )}
            <Navbar />
            {
                blogwithsidebar ? <WithSidebar children={children} ads={ads} /> :
                    blogcentered ? <Centered children={children} /> :
                        home ? <HomeLayout children={children} /> :
                            standard ? <StandardLayout children={children} /> :
                                <HomeLayout children={children} />
            }
        </>
    )
}
export default PageLayout;
