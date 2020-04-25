import React, { useContext, useEffect } from "react";
import HeaderNavigation from "./HeaderNavigation";
import HeaderTitle from "./HeaderTitle";
import styles from "./Header.module.scss";

import AuthContext from "../../context/auth/authContext";

const Header = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        //eslint-disable-next-line
    }, []);

    return (
        <header className={styles.wrapper}>
            <HeaderNavigation />
            <HeaderTitle />
        </header>
    );
};

export default Header;
