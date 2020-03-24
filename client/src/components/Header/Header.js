import React from "react";
import HeaderNavigation from "./HeaderNavigation";
import HeaderTitle from "./HeaderTitle";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <HeaderNavigation />
            <HeaderTitle />
        </header>
    );
};

export default Header;
