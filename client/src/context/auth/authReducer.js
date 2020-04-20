import {
    LOGIN_SUCCESS,
    SET_ERRORS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    CLEAR_ERRORS,
    SET_ACTIVE_TAB,
} from "../types";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuth: true,
                user: payload.user,
            };
        case SET_ERRORS:
            return { ...state, errors: payload };
        case LOGIN_FAIL:
            return {
                ...state,
                message: { success: payload.success, message: payload.message },
            };
        case REGISTER_SUCCESS:
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
        default:
            return state;
    }
};
