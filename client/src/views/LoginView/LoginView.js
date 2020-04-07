import React from "react";
import Form from "../../components/Forms/AuthForm/AuthForm";
import styles from "./LoginView.module.scss";

const LoginView = () => {
    return (
        <div className={styles.wrapper}>
            <Form></Form>
        </div>
    );
};

export default LoginView;
