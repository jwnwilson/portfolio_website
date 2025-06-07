import { iArticle } from "../../shared/interfaces"
import ArticleHeaderCenter from "./ArticleHeaderCentered"
import ArticleHeaderDefault from "./ArticleHeaderDefault"

interface IArticleHeader {
    centered?: boolean,
    ARTICLE_DETAILS: iArticle,
    showAuthor?: boolean,
    showTags?: boolean
}
const ArticleHeader = ({ centered = false, ARTICLE_DETAILS, showAuthor = true, showTags = true }: IArticleHeader) => {
    return (
        centered ? <ArticleHeaderCenter headerData={ARTICLE_DETAILS.preview} showAuthor={showAuthor} showTags={showTags} /> :
            <ArticleHeaderDefault headerData={ARTICLE_DETAILS.preview} />
    )
}

export default ArticleHeader