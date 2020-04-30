import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import axios from "axios";
import {
    USER_LOADED,
    LOGIN_SUCCESS,
    SET_AUTH_FAIL_MESSAGE,
    SET_ERRORS,
    REGISTER_SUCCESS,
    SET_ACTIVE_TAB,
    CLEAR_ERRORS,
    USER_LOADED_FAIL,
    LOGOUT,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = ({ children }) => {
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
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("/api/users/current");
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
                payload: err.response.data,
            });
        }
    };

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
                    loadUser();
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
                    type: SET_AUTH_FAIL_MESSAGE,
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
    const logout = () => {
        dispatch({ type: LOGOUT });
    };

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
                loadUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
