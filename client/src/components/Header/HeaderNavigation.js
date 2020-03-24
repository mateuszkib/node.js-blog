import React from "react";
import HeaderNavigationItems from "./HeaderNavigationItems";
import styles from "./HeaderNavigation.module.scss";
import logo from "../../assets/images/logo.svg";

const HeaderNavigation = () => {
    return (
        <nav className={styles.wrapper}>
            <img src={logo} width="40" height="40" alt="Blog logo" />
            <HeaderNavigationItems />
        </nav>
    );
};

export default HeaderNavigation;
