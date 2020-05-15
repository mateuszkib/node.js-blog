import React, { useContext, useEffect } from "react";
import ArticleContext from "../../../context/articles/articleContext";
import ArticlesItem from "./ArticlesItem";

const ArticlesList = (props) => {
    const articleContext = useContext(ArticleContext);
    let { getArticles, articles } = articleContext;

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div className="container mt-5">
            {articles &&
                articles.map((article) => (
                    <ArticlesItem article={article} key={article._id} />
                ))}
        </div>
    );
};

export default ArticlesList;
