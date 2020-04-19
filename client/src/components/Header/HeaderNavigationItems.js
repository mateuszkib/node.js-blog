import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./HeaderNavigationItems.module.scss";

const HeaderNavigationItems = () => {
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
                <li className={styles.navItem}>
                    <NavLink to="/auth" className={styles.navItemLink}>
                        Account
                    </NavLink>
                </li>
            </ul>
        </>
    );
};

export default HeaderNavigationItems;
