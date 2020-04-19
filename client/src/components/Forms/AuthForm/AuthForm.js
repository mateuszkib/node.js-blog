import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../../context/alert/alertContext";
import styles from "./AuthForm.module.scss";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import LockImage from "../../../assets/images/lock.svg";
import Alert from "../../Alert/Alert";
import axios from "axios";

const AuthForm = (props) => {
    const alertContext = useContext(AlertContext);
    const { setAlert, alert } = alertContext;

    const initialStateForm = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };
    const history = useHistory();
    const [form, setForm] = useState(initialStateForm);
    const [activeTab, setActiveTab] = useState("Login");
    const [errors, setErrors] = useState({});

    const handleClickActiveTab = (tab) => {
        setActiveTab(tab);
        setErrors({});
    };

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        setErrors({});
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:3000/api/auth/${activeTab.toLowerCase()}`,
                { data: form }
            );
            if (res.data.success) {
                if (activeTab === "Login") {
                    history.push("/");
                } else {
                    const { message } = res.data;
                    history.push("/auth");
                    setAlert({ type: "success", message });
                    setForm(initialStateForm);
                    setActiveTab("Login");
                }
            }
        } catch (err) {
            const { data } = err.response;
            if (data.hasOwnProperty("message")) {
                const { message } = data;
                setAlert({ type: "danger", message });
            } else {
                setErrors(data.errors);
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {alert.alert && <Alert />}
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.authTabs}>
                    <span
                        className={
                            activeTab === "Register"
                                ? styles.authTabsActive
                                : undefined
                        }
                        onClick={() => handleClickActiveTab("Register")}
                    >
                        Register
                    </span>
                    <span
                        className={
                            activeTab === "Login"
                                ? styles.authTabsActive
                                : undefined
                        }
                        onClick={() => handleClickActiveTab("Login")}
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
                        <img src={LockImage} alt={"Auth form logo"} />
                    </div>
                    {activeTab === "Register" && (
                        <Input
                            type={"name"}
                            name={"name"}
                            placeholder={"Name"}
                            onChange={handleChangeInput}
                            value={form.name}
                            error={errors.name}
                        />
                    )}
                    <Input
                        type={"email"}
                        name={"email"}
                        placeholder={"Email"}
                        onChange={handleChangeInput}
                        value={form.email}
                        error={errors.email}
                    />
                    <Input
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        onChange={handleChangeInput}
                        value={form.password}
                        error={errors.password}
                    />
                    {activeTab === "Register" && (
                        <Input
                            type={"password"}
                            name={"passwordConfirm"}
                            placeholder={"Confirm Password"}
                            onChange={handleChangeInput}
                            value={form.passwordConfirm}
                            error={errors.passwordConfirm}
                        />
                    )}
                    <div className={styles.formButton}>
                        <Button>{activeTab}</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AuthForm;
