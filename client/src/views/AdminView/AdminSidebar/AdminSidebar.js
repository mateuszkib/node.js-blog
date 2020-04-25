import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faNodeJs } from "@fortawesome/free-brands-svg-icons";
import styles from "./AdminSidebar.module.scss";

library.add(fab);

const AdminSidebar = () => {
    return (
        <div className={styles.wrapper}>
            <div
                className={
                    styles.logo +
                    " d-flex justify-content-center align-items-center"
                }
            >
                <FontAwesomeIcon
                    icon={faNodeJs}
                    size="4x"
                    style={{ color: "#026e00" }}
                />
            </div>
            <div className={styles.sidebarNav}>
                <ul className="list-group-flush">
                    <li className="list-group-item">
                        <b>Users</b>
                        <span className="badge badge-primary badge-dark ml-2">
                            14
                        </span>
                        <ul className="list-group mt-1">
                            <li className="list-group-item list-group-item-light">
                                Show all users
                            </li>
                            <li className="list-group-item list-group-item-light">
                                Add new user
                            </li>
                            <li className="list-group-item list-group-item-light">
                                Add role to user
                            </li>
                        </ul>
                    </li>
                    <li className="list-group-item">
                        <b>Articles</b>
                        <span className="badge badge-primary badge-dark ml-2">
                            2
                        </span>
                        <ul className="list-group mt-1">
                            <li className="list-group-item list-group-item-light">
                                Show all articles
                            </li>
                            <li className="list-group-item list-group-item-light">
                                Add new article
                            </li>
                        </ul>
                    </li>
                    <li className="list-group-item">
                        <b>Posts</b>
                        <span className="badge badge-primary badge-dark ml-2">
                            1
                        </span>
                        <ul className="list-group mt-1">
                            <li className="list-group-item list-group-item-light">
                                Show all posts
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
