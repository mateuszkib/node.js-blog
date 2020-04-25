import React from "react";
import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import styles from "./AuthView.module.scss";

const AuthView = (props) => {
    return (
        <div className={styles.wrapper}>
            <AuthForm {...props}></AuthForm>
        </div>
    );
};

export default AuthView;
