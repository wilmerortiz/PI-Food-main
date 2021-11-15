import React from "react";
const initialState = {
    loading: true,
    recipesFavourites: [],
    recipesLoaded: [],
    searchResults: [],
    filterResults: [],
    dietsLoaded:[],
    recipeDetail: {},
    $responses: {
        open: false,
        message: '',
        error: false
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_MESSAGE":
            return {
                ...state,
                $responses: action.payload
            }
        case "ADD_RECIPE_DB":
            return {
                ...state,
                $responses: action.payload
            }
        case "ADD_DIET_DB":
            return {
                ...state,
                $responses: action.payload,
                loading: false,
            }
        case "GET_RECIPES":
            return {
                ...state,
                recipesLoaded: action.payload,
                filterResults: action.payload,
                loading: false
            }
        case "GET_RECIPES_ALL":
            return {
                ...state,
                recipesLoaded: action.payload,
                filterResults: action.payload,
                loading: false
            };
        case "GET_RECIPE_DETAIL":
            return {
                ...state,
                recipeDetail: action.payload,
                loading: true,
            };
        case "GET_DIETS_ALL":
            return {
                ...state,
                dietsLoaded: action.payload,
                searchResults: action.payload,
            };
        case "FILTER_BY_DIET":
            let lista = [];

            state.filterResults?.map(rc => {
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
                recipesLoaded: action.payload === 'All' ? state.filterResults : lista
            };
        case "SEARCH_DIET":
            return {
                ...state,
                dietsLoaded: state.searchResults.filter((diet) =>
                    diet.name.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        default:
            return state
    }
}

export default rootReducer;