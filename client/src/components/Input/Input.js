import React from "react";
import styles from "./Input.module.scss";

const Input = ({ type, name, placeholder }) => {
    return (
        <div className={styles.formItem}>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    );
};

export default Input;
