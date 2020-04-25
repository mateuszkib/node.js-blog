import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HeaderNavigationItems.module.scss";

import AuthContext from "../../context/auth/authContext";

const HeaderNavigationItems = () => {
    const authContext = useContext(AuthContext);
    const { user, isAuth, logout } = authContext;

    const authLinks = () => (
        <>
            <li className={styles.navItem + " dropdown show"}>
                <NavLink
                    className={styles.navItemLink + " dropdown-toggle"}
                    to="#"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    My Account
                </NavLink>

                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <NavLink
                        className={styles.navItemLinkDropdownItem}
                        to="/profile"
                    >
                        Edit profile
                    </NavLink>
                    {user.role === "admin" ? (
                        <NavLink
                            className={styles.navItemLinkDropdownItem}
                            to="/admin"
                        >
                            Admin panel
                        </NavLink>
                    ) : null}
                    <NavLink
                        className={styles.navItemLinkDropdownItem}
                        to="/"
                        onClick={logout}
                    >
                        Logout
                    </NavLink>
                </div>
            </li>
        </>
    );

    const guestLinks = () => (
        <li className={styles.navItem}>
            <NavLink to="/auth" className={styles.navItemLink}>
                Account
            </NavLink>
        </li>
    );

    return (
        <>
            <ul className={styles.wrapper}>
                <li className={styles.navItem}>
                    <NavLink to="/" className={styles.navItemLink}>
                        Home
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink to="/articles" className={styles.navItemLink}>
                        Articles
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink to="/contact" className={styles.navItemLink}>
                        Contact
                    </NavLink>
                </li>
                {isAuth ? authLinks() : guestLinks()}
            </ul>
        </>
    );
};

export default HeaderNavigationItems;
