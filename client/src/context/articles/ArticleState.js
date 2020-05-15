import React, { useReducer } from "react";
import ArticleContext from "./articleContext";
import articleReducer from "./articleReducer";

import axios from "axios";
import { GET_ARTICLES } from "../types";

const ArticleState = ({ children }) => {
    const initialState = {
        articles: [],
        article: null,
        errors: {},
    };

    const [state, dispatch] = useReducer(articleReducer, initialState);

    const getArticles = async () => {
        try {
            const res = await axios.get("/api/articles");
            if (res.data.success) {
                console.log(res);
                let { data } = res.data;
                dispatch({
                    type: GET_ARTICLES,
                    payload: data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ArticleContext.Provider
            value={{
                articles: state.articles,
                article: state.article,
                errors: state.errors,
                getArticles,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
};

export default ArticleState;
