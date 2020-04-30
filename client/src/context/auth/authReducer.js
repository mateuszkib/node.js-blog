import {
    LOGIN_SUCCESS,
    SET_ERRORS,
    SET_AUTH_FAIL_MESSAGE,
    REGISTER_SUCCESS,
    CLEAR_ERRORS,
    SET_ACTIVE_TAB,
    USER_LOADED,
    USER_LOADED_FAIL,
    LOGOUT,
} from "../types";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                user: payload.user,
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                isAuth: false,
                message: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuth: true,
                user: payload.user,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                message: { success: payload.success, message: payload.message },
            };
        case SET_ERRORS:
            return { ...state, errors: payload };
        case SET_AUTH_FAIL_MESSAGE:
            return {
                ...state,
                message: { success: payload.success, message: payload.message },
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
            };
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: payload,
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null,
            };
        default:
            return state;
    }
};
