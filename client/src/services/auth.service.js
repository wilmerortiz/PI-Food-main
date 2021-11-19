import axios from "axios";

const API_URL = "http://localhost:3001/";

const getUsers = () => {
    return axios
        .get(API_URL + "users")
        .then((response) => {
            //console.log(response.data)
            return response.data;
        });
};

const register = (user) => {
    return axios.post(API_URL + "users", user);
};

const login = (username, password) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    getUsers,
    register,
    login,
    logout,
};