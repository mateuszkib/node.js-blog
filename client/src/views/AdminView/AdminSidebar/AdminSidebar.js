import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faNodeJs } from "@fortawesome/free-brands-svg-icons";
import styles from "./AdminSidebar.module.scss";
import AdminContext from "../../../context/admin/adminContext";

library.add(fab);

const AdminSidebar = () => {
    const adminContext = useContext(AdminContext);
    const { clearUser } = adminContext;

    return (
        <div className="col-2 bg-dark">
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
                                    <NavLink to="/admin/users">
                                        Show all users
                                    </NavLink>
                                </li>
                                <li className="list-group-item list-group-item-light">
                                    <NavLink
                                        to="/admin/users/add"
                                        onClick={() => clearUser()}
                                    >
                                        Add new user
                                    </NavLink>
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
                                    <NavLink to="/admin/articles">
                                        Show all articles
                                    </NavLink>
                                </li>
                                <li className="list-group-item list-group-item-light">
                                    <NavLink to="/admin/articles/add">
                                        Add new article
                                    </NavLink>
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
                                    <NavLink to="/admin/posts">
                                        Show all posts
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
