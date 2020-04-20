import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import { withRouter } from "react-router-dom";

import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_ERRORS,
    REGISTER_SUCCESS,
    SET_ACTIVE_TAB,
    CLEAR_ERRORS,
} from "../types";

const AuthState = ({ children, history }) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuth: null,
        user: null,
        activeTab: "Login",
        message: {},
        errors: {},
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    // Load user

    // Login user
    const auth = async (data, type) => {
        try {
            const res = await axios.post(`/api/auth/${type}`, { data });
            if (res.data.success) {
                if (type === "login") {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data,
                    });
                    history.push("/");
                } else if (type === "register") {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: res.data,
                    });
                    dispatch({
                        type: SET_ACTIVE_TAB,
                        payload: "Login",
                    });
                }
                dispatch({
                    type: CLEAR_ERRORS,
                });
            }
        } catch (err) {
            const { data } = err.response;
            if (data.hasOwnProperty("message")) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: data,
                });
                dispatch({
                    type: CLEAR_ERRORS,
                });
            } else {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data,
                });
            }
        }
    };

    // Set Active Tab
    const setActiveTab = (tab) => {
        dispatch({
            type: SET_ACTIVE_TAB,
            payload: tab,
        });
    };

    // Clear errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };

    // Logout

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                activeTab: state.activeTab,
                message: state.message,
                errors: state.errors,
                auth,
                setActiveTab,
                clearErrors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default withRouter(AuthState);
