import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
    const initialState = {};

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const id = uuidv4();
    const setAlert = ({ type, message }) => {
        dispatch({
            type: SET_ALERT,
            payload: { message, type, id },
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
