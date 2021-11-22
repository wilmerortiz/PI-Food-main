import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/";

const getUsers = () => {
    return axios
        .get(API_URL + "users")
        .then((response) => {
            //console.log(response.data)
            return response.data;
        });
};

const getFavorites = (userId) => {
    return axios
        .get(`${API_URL}users/recipesFavorites/${userId}`)
        .then((response) => {
            //console.log(response.data)
            return response.data;
        });
};

const registerFavorite = (user) => {
    return axios.post(API_URL + "users/favorites", user);
};
/*
const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};
*/
export default {
    getUsers,
    getFavorites,
    registerFavorite,
    //getPublicContent,
    //getUserBoard,
    //getModeratorBoard,
    //getAdminBoard,
};