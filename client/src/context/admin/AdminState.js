import React, { useReducer } from "react";
import axios from "axios";
import adminReducer from "./adminReducer";
import AdminContext from "./adminContext";
import {
    GET_USERS,
    SET_ERRORS,
    SET_TOAST,
    CLEAR_TOAST,
    SET_ADMIN_COMPONENT,
    GET_USER,
    CLEAR_USER,
} from "../types";

const AdminState = ({ children }) => {
    const initialState = {
        users: null,
        user: null,
        articles: null,
        posts: null,
        errors: {},
        message: {},
        component: "dashboard",
    };

    const [state, dispatch] = useReducer(adminReducer, initialState);

    // Function to catch errors from try catch block
    const catchErrors = (err) => {
        const { data } = err.response;
        if (data.errors) {
            dispatch({
                type: SET_ERRORS,
                payload: data.errors,
            });
        } else {
            dispatch({
                type: SET_TOAST,
                payload: data,
            });
            setTimeout(() => {
                dispatch({ type: CLEAR_TOAST });
            }, 3000);
        }
    };

    // Set active component
    const setComponent = (component) => {
        dispatch({ type: SET_ADMIN_COMPONENT, payload: component });
    };

    // Get users
    const getUsers = async () => {
        try {
            const res = await axios.get("/api/users");
            if (res.data.success) {
                dispatch({
                    type: GET_USERS,
                    payload: res.data,
                });
            }
        } catch (err) {
            catchErrors(err);
        }
    };

    // Get user
    const getUser = async (id) => {
        try {
            const res = await axios.get(`/api/users/${id}`);
            if (res.data.success) {
                dispatch({
                    type: GET_USER,
                    payload: res.data.data,
                });
            }
        } catch (err) {}
    };

    // Add user
    const addUser = async (data, file = null) => {
        try {
            let formData = new FormData();
            if (file) {
                formData.append("photo", file);
            }
            formData.append("data", JSON.stringify(data));

            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };

            const res = await axios.post("/api/users", formData, config);

            if (res.data.success) {
                dispatch({ type: SET_TOAST, payload: res.data });
                setTimeout(() => {
                    dispatch({ type: CLEAR_TOAST });
                }, 3000);
            }
        } catch (err) {
            catchErrors(err);
        }
    };

    // Clear user
    const clearUser = () => {
        dispatch({
            type: CLEAR_USER,
        });
    };

    return (
        <AdminContext.Provider
            value={{
                users: state.users,
                user: state.user,
                aticles: state.articles,
                posts: state.posts,
                errors: state.errors,
                message: state.message,
                component: state.component,
                getUsers,
                getUser,
                clearUser,
                addUser,
                setComponent,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export default AdminState;
