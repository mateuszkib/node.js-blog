import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuth: null,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user

    // Login user

    // Logout

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                logout: state.logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
