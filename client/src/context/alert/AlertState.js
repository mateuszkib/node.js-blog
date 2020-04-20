import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
    const initialState = {};

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = ({ type, message }) => {
        dispatch({
            type: SET_ALERT,
            payload: { message, type },
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
