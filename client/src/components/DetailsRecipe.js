import React, {useEffect} from "react";
import {connect} from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import parse from 'html-react-parser';
import { getRecipeDetail } from '../actions';
import Loading from "./Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DetailsRecipe = ({getRecipeDetail, recipe}) => {
    const { search } = useLocation();
    const { origin } = queryString.parse(search)
    let { id } = useParams();

    //console.log(origin);

    useEffect(() => {
        getRecipeDetail(id, origin)
    }, [])

    //console.log(recipe)
    return(
        <>
            {!recipe.id ? <Loading/> :
            <section className="recipeDetails" key={id} style={{flexDirection: 'column' , textAlign:'center'}}>
                <div className="detail-img mb-1">
                    <img src={recipe.image} alt="" style={{borderRadius: '12px'}}/>
                </div>
                <div className="detail detail-name mb-1">
                    <h1>{recipe.title}</h1>
                </div>
                <div className={`mb-2`}>
                    <h3 className={`mb-1`}>Ready in minutes</h3>
                    <span className="chips"><FontAwesomeIcon icon="fa-regular fa-clock" /> {recipe.readyInMinutes}</span>
                </div>
                <div className="detail detail-dishTypes mb-2">
                    <h3 className="mb-1">Type Dishes</h3>
                    {recipe.dishTypes.map( tp => <span key={tp} className="chips">{tp}</span>)}
                </div>
                <div className="detail detail-diets mb-2">
                    <h3 className="mb-1">Type Diets</h3>
                    {!recipe.origin ? recipe.diets.map( dt => <span key={dt} className="chips">{dt}</span>) : recipe.diets.map( dt => <span key={dt.id} className="chips">{dt.name}</span>)}
                </div>
                <div className="detail detail-summary mb-2">
                    <h3>Summary</h3>
                    <p>{parse(recipe.summary)}</p>
                </div>
                <div className=" detail detail-punctuation mb-1">
                    <h3 className="mb-1">Score</h3>
                    <span className="chips"><FontAwesomeIcon icon="fa-solid fa-star" size={`lg`}/> {recipe.spoonacularScore}</span>
                </div>
                <div className="detail detail-nivel-saludable mb-2">
                    <h3 className="mb-1">Health Score</h3>
                    <span className="chips"><FontAwesomeIcon icon="fa-brands fa-gratipay" size={`lg`}/> {recipe.healthScore}</span>
                </div>
                <div className="detail detail-summary mb-1">
                    <h3>Instructions</h3>
                    <p>{/*parse(recipe?.instructions.replace(/\./g, '.<br /><br />'))*/}</p>
                    <p>{recipe.instructions && parse(recipe.instructions)}</p>
                </div>
            </section>}
        </>
    )
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe.recipeDetail,
        loading: state.recipe.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetail: (id, origin) => dispatch(getRecipeDetail(id, origin)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsRecipe)