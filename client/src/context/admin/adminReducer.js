import {
    GET_USERS,
    SET_ERRORS,
    SET_TOAST,
    CLEAR_TOAST,
    GET_USER,
    CLEAR_USER,
    UPDATE_USER,
    DELETE_USER,
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
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user._id !== action.payload._id
                ),
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
        default:
            return state;
    }
};
