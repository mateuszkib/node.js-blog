import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case SET_ALERT:
            return { ...state, alert: payload };
        case REMOVE_ALERT:
            return delete state.alert ? {} : state;
        default:
            return state;
    }
};
