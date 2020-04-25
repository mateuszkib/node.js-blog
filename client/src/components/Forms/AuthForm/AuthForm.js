import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import styles from "./AuthForm.module.scss";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import LockImage from "../../../assets/images/lock.svg";
import Alert from "../../Alert/Alert";

const AuthForm = (props) => {
    const alertContext = useContext(AlertContext);
    const {
        alert: { alert },
        setAlert,
    } = alertContext;

    const authContext = useContext(AuthContext);
    const {
        auth,
        errors: { errors },
        activeTab,
        setActiveTab,
        clearErrors,
        message,
        isAuth,
    } = authContext;

    const initialStateForm = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    const [form, setForm] = useState(initialStateForm);

    useEffect(() => {
        if (isAuth) {
            props.history.push("/");
        }
        if (message.hasOwnProperty("message")) {
            const { success, message: msg } = message;
            if (!success) {
                setAlert({
                    type: "danger",
                    message: msg,
                });
            } else {
                setAlert({
                    type: "success",
                    message: msg,
                });
            }
        }
        // eslint-disable-next-line
    }, [message, isAuth]);

    const handleClickActiveTab = (tab) => {
        setActiveTab(tab);
        clearErrors();
    };

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        auth(form, activeTab.toLowerCase());
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {alert && <Alert />}
                    </div>
                    <div className="col-md-6 offset-md-3">
                        <div className={styles.wrapper}>
                            <div className={styles.authTabs}>
                                <span
                                    className={
                                        activeTab === "Register"
                                            ? styles.authTabsActive
                                            : undefined
                                    }
                                    onClick={() =>
                                        handleClickActiveTab("Register")
                                    }
                                >
                                    Register
                                </span>
                                <span
                                    className={
                                        activeTab === "Login"
                                            ? styles.authTabsActive
                                            : undefined
                                    }
                                    onClick={() =>
                                        handleClickActiveTab("Login")
                                    }
                                >
                                    Login
                                </span>
                            </div>
                            <form
                                className={styles.form}
                                autoComplete="off"
                                onSubmit={submitForm}
                            >
                                <div className={styles.formImage}>
                                    <img
                                        src={LockImage}
                                        alt={"Auth form logo"}
                                    />
                                </div>
                                {activeTab === "Register" && (
                                    <Input
                                        type={"name"}
                                        name={"name"}
                                        placeholder={"Name"}
                                        onChange={handleChangeInput}
                                        value={form.name}
                                        error={errors ? errors.name : undefined}
                                    />
                                )}
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"Email"}
                                    onChange={handleChangeInput}
                                    value={form.email}
                                    error={errors ? errors.email : undefined}
                                />
                                <Input
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                    onChange={handleChangeInput}
                                    value={form.password}
                                    error={errors ? errors.password : undefined}
                                />
                                {activeTab === "Register" && (
                                    <Input
                                        type={"password"}
                                        name={"passwordConfirm"}
                                        placeholder={"Confirm Password"}
                                        onChange={handleChangeInput}
                                        value={form.passwordConfirm}
                                        error={
                                            errors
                                                ? errors.passwordConfirm
                                                : undefined
                                        }
                                    />
                                )}
                                <div className={styles.formButton}>
                                    <Button>{activeTab}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
