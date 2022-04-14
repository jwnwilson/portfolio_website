import { useEffect, useState } from "react";
import { IArticle } from "../../shared/interfaces";
import classes from "./ArticleCard.module.scss";
import { combineClasses, getTheme, setPath } from "../../utils/utils";
import Link from "next/link";

interface IProp {
    article: IArticle;
    path: string;
}


const FeaturedArticle = ({ article, path }: IProp) => {
    const [theme, setTheme] = useState('');
    useEffect(() => {
        getTheme(setTheme);
    }, [theme]);

    return (
        <div className={combineClasses(classes.featured_article, theme === 'dark' ? classes.dark : null)}>
            <Link href={setPath(path)}>
                <div className={classes.featured_article__content}>
                    <div className={combineClasses(classes.featured_article_footer, "mt-0 mb-10")}>
                        <div className={classes.author}>
                            <div className={classes.author_img}></div>
                            <p className={combineClasses(classes.author_name, 'font-16 font-sm-14 my-0 font-medium')}>
                                {article.author.name}
                            </p>
                        </div>
                        {
                            article.category && <>
                                <p className="font-16 font-sm-14 px-5">in</p>
                                <p className="font-medium font-16 font-sm-14">{article.category?.label}</p>
                            </>
                        }
                    </div>
                    <h1 className={combineClasses(classes.featured_article__title, "font-24 font-bold mt-0 mb-10")} >
                        {article.articleTitle}
                    </h1>
                    <p className={combineClasses(classes.featured_article__intro, "font-14 font-regular mt-0 mb-10")}>
                        {article.shortIntro.slice(0, 150)} ...
                    </p>

                    <div className={classes.featured_article__tags}>
                        {
                            article.tags.map((each, i) => (
                                <span key={i} className="font-12 font-regular mr-10" >#{each}</span>
                            ))
                        }
                    </div>
                    <p className={combineClasses(classes.featured_article__date, "font-regular font-12 mt-15 mb-0")}>{article.date}</p>
                </div>
            </Link>
            <div className={classes.featured_article__image} style={{ background: `url(${article.thumbnail})` }}>
                {/* <img src={article.thumbnail} alt={article.articleTitle} /> */}
            </div>
        </div>
    )
}

export default FeaturedArticle