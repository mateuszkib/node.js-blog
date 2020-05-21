import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./ArticlesItem.module.scss";
import moment from "moment";

const ArticlesItem = ({ article }) => {
    console.log(article.title.length);
    return (
        <div className={styles.wrapper + " row mb-5"}>
            <div className="col-xl-8 col-lg-6 col-md-6">
                <NavLink
                    to={`/article/${article._id}`}
                    className={styles.image}
                >
                    <img
                        src={
                            process.env.REACT_APP_URL_ARTICLES_IMAGE +
                            "/" +
                            article.photo
                        }
                    />
                </NavLink>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
                <span className={styles.category}>
                    {article.category.name.toUpperCase()}
                </span>
                <h2 className={styles.title}>
                    {article.title.length > 50
                        ? article.title + "..."
                        : article.title}
                </h2>
                <div className={styles.icons}>
                    <a href="https://twitter.com">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://facebook.com">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://instagram.com">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <div className={styles.footer}>
                    <span className={styles.footerDate}>
                        {moment(article.createdAt).format("L")}
                    </span>{" "}
                    <span className={styles.footerAuthor}>
                        | {article.author.name}
                    </span>
                </div>
            </div>
        </div>
    );
};

ArticlesItem.propTypes = {
    article: PropTypes.object,
};

export default ArticlesItem;
