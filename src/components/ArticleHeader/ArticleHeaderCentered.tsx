import Link from "next/link"
import { IArticleHeaderData } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import ArticleTags from "../Misc/ArticleTags"
import classes from './ArticleHeader.module.scss'

interface IProps {
    headerData: IArticleHeaderData
    showTags?: boolean
    showAuthor?: boolean
}

const ArticleHeaderCenter = ({ headerData, showTags = true, showAuthor = true }: IProps) => {
    return (
        <div>
            <h1 className={combineClasses(classes.articleTitle, "text-center text-2xl md:text-4xl font-medium mb-[5px]")}>
                {headerData.articleTitle}
            </h1>
            <div className={combineClasses("mb-[10px] mt-[15px] text-[14px] font-medium", classes.centered_article_header_author)}>
                {showAuthor && (
                    <p className={'my-0 mx-[30px] font-medium'}>
                        {headerData.author.name}
                        {
                            headerData.category && <>
                                <span className="px-1 font-light">in</span>
                                <Link href={"/blog?category=" + headerData.category} passHref={true}>
                                    {headerData.category}
                                </Link>
                            </>
                        }
                    </p>
                )}
                <p className="my-0">{headerData.date}</p>
            </div>
            {showTags && <ArticleTags tags={headerData.tags} center />}
        </div>
    )
}

export default ArticleHeaderCenter