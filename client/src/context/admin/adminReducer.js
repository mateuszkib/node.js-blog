import {
    GET_USERS,
    SET_ERRORS,
    SET_TOAST,
    CLEAR_TOAST,
    SET_ADMIN_COMPONENT,
    GET_USER,
    CLEAR_USER,
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        case SET_TOAST:
            return {
                ...state,
                message: {
                    success: action.payload.success,
                    message: action.payload.message,
                },
            };
        case CLEAR_TOAST:
            return {
                ...state,
                message: {},
            };
        case SET_ADMIN_COMPONENT:
            return {
                ...state,
                component: action.payload,
            };
        default:
            return state;
    }
};
