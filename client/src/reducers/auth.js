import {GET_USERS, GET_FAVORITES, FILTER_BY_DIET_FAVORITE, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../actions/types";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user, users:[], favorites:[], loading: true, filterFavorites: []}
    : { isLoggedIn: false, user: null, users:[], favorites:[], loading: true, filterFavorites: [] }

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                isLoggedIn: false,
                users: payload
            };
        case GET_FAVORITES:
            return {
                ...state,
                isLoggedIn: false,
                favorites: payload,
                filterFavorites: payload,
                loading: false
            };
        case FILTER_BY_DIET_FAVORITE:
            let lista = [];
            //console.log(state.filterFavorites)
            state.filterFavorites.map(rc => {
                let contador = 0;

                if(rc.origin){
                    rc.diets?.map(dt => {
                        if (dt.name.toLowerCase() === action.payload.toLowerCase()) contador++
                    })
                }else{
                    rc.diets?.map(dt => {
                        if (dt.toLowerCase() === action.payload.toLowerCase()) contador++
                    })
                }

                if(contador > 0){
                    lista.push(rc)
                }
            })

            return {
                ...state,
                favorites: action.payload === 'All' ? state.filterFavorites : lista
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