import React from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";

const Input = ({
    type,
    name,
    placeholder,
    onChange,
    className,
    value,
    error,
}) => {
    return (
        <div className={styles.formItem}>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                className={
                    className
                        ? className
                        : error
                        ? styles.input + " " + styles.inputInvalid
                        : styles.input
                }
                onChange={onChange}
                value={value}
            />
            {error && <div className={styles.formItemInvalid}>{error}</div>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
};

export default Input;
