import React, { useState } from "react";
import styles from "./AuthForm.module.scss";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import LockImage from "../../../assets/images/lock.svg";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Login");

    return (
        <div className={styles.wrapper}>
            <form autoComplete="off" className={styles.form}>
                <div className={styles.formImage}>
                    <img src={LockImage} alt={"Lock image"} />
                </div>
                <Input type={"name"} name={"name"} placeholder={"Name"} />
                <Input type={"email"} name={"email"} placeholder={"Email"} />
                <Input
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                />
                <Input
                    type={"passwordConfirm"}
                    name={"passwordConfirm"}
                    placeholder={"Confirm Password"}
                />
                <div className={styles.formButton}>
                    <Button>Login</Button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
