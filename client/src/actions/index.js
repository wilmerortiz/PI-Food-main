const axios = require("axios");
const GET_RECIPES = "GET_RECIPES";
const GET_RECIPES_ALL = "GET_RECIPES_ALL";
const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
const ADD_RECIPE_DB = "ADD_RECIPE_DB";

//DIETS
const GET_DIETS_ALL = "GET_DIETS_ALL";
const ADD_DIET_DB = "ADD_DIET_DB";

//MESSAGE
const GET_MESSAGE = "GET_MESSAGE"

//FILTER BY DIET
const FILTER_BY_DIET = "FILTER_BY_DIET"

//SEARCH DIET TYPE
const SEARCH_DIET = 'SEARCH_DIET';

const closeMessage = (obj) => {
    return {
        type: GET_MESSAGE,
        payload: obj
    }
}

const getRecipesAll = () => {
    let url = `http://localhost:3001/recipes`;
    return function(dispatch) {
        return axios.get(url)
            .then(function(response){
                dispatch({ type: GET_RECIPES_ALL, payload: response.data });
            });
    };
}

const getRecipes = ({name}) => {
    let url = `http://localhost:3001/recipes?nombre=${name}`;
    return function(dispatch) {
        return axios.get(url)
            .then(({ data }) => {
                dispatch({ type: GET_RECIPES, payload: data });
            });
    };
}

const getRecipeDetail = (id, origin) => {
    let url = `http://localhost:3001/recipes/${id}?origin=${origin}`;
    return function(dispatch) {
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_RECIPE_DETAIL, payload: json });
            });
    };
}

const addRecipeDB = (recipe) => {
    let url = `http://localhost:3001/recipes`;
    return async (dispatch) => {
        return await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(recipe),
            url: url,
        }).then(({data}) => {
            dispatch({ type: ADD_RECIPE_DB, payload: data });
        }).catch(error => {
            throw (error);
        });
    };
}

//Diets
const getDietsAll = () => {
    let url = `http://localhost:3001/types`;
    return function(dispatch) {
        return axios.get(url)
            .then(({ data }) => {
                dispatch({ type: GET_DIETS_ALL, payload: data });
            });
    };
}

const addDietDB = (diet) => {
    let url = `http://localhost:3001/types`;
    return async (dispatch) => {
        return await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: diet,
            url: url,
        }).then(({data}) => {
            //console.log(data);
            dispatch({ type: ADD_DIET_DB, payload: data });
        }).catch(error => {
            throw (error);
        });
    };
}

/*-----------------------------
*  Filter by Diet Types
*------------------------------*/
const filterByDietType = (query) => {
    return {
        type: FILTER_BY_DIET,
        payload: query
    }
}

/*-----------------------------
*  Search Diet Types
*------------------------------*/
const searchDiet = (query) => {
    return {
        type: SEARCH_DIET,
        payload: query
    }
}

module.exports = {
    closeMessage,
    getRecipesAll,
    getRecipes,
    getRecipeDetail,
    addRecipeDB,
    getDietsAll,
    addDietDB,
    filterByDietType,
    searchDiet
}