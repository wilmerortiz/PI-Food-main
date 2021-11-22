import {
    GET_USERS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user, users:[], favorites:[]}
    : { isLoggedIn: false, user: null, users:[], favorites: [] };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                isLoggedIn: false,
                users: payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}