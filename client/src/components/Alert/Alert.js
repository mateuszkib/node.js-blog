import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext.alert;

    return (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
            {alert.message}
        </div>
    );
};

export default Alert;
