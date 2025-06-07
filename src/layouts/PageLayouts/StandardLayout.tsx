import classes from './PageLayout.module.scss';
import { combineClasses, getArticleDetails, transformImagePaths, transformPath } from '../../utils/utils';
import ArticleHeader from '../../components/ArticleHeader';

const StandardLayout = ({ children }: { children: any }) => {
    const ARTICLE_DETAILS = getArticleDetails();
    return (
        <>
            <article className={combineClasses(classes.article_content, 'pb-[30px] px-3 bg-white dark:bg-slate-800 dark:border-none dark:drop-shadow-lg dark:text-white pt-[80px] md:pt-5 mx-auto font-regular text-lg leading-relaxed')}>
                <ArticleHeader ARTICLE_DETAILS={ARTICLE_DETAILS} centered showAuthor={false} showTags={false} />
                {children}
            </article>
        </>
    )
}

export default StandardLayout