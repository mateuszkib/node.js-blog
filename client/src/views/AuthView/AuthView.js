import React from "react";
import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import styles from "./AuthView.module.scss";

const AuthView = () => {
    return (
        <div className={styles.wrapper}>
            <AuthForm></AuthForm>
        </div>
    );
};

export default AuthView;
