import React, {useEffect} from "react";
import {connect} from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import parse from 'html-react-parser';
import { getRecipeDetail } from '../actions';
import Loading from "./Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fondo from '../assets/img/pattern1.png'

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
            <section className="recipeDetails" key={id}>
                <div className={`details-generic`}>
                    <div className="detail-img mb-1">
                        <img src={recipe.image} alt="" style={{borderRadius: '12px'}}/>
                    </div>
                    <div className={`details-varios`}>
                        <div className="detail-name mb-1">
                            <h1>{recipe.title}</h1>
                        </div>
                        <div className={`detail-items`}>
                            <div className={`mb-2`}>
                                <h3 className={`mb-1`}>Servings</h3>
                                <span className={`chips`}><FontAwesomeIcon icon="fa-solid fa-users" size={`lg`}/> {recipe.servings}</span>
                            </div>
                            <div className={`mb-2`}>
                                <h3 className={`mb-1`}>Ready in minutes</h3>
                                <span className="chips"><FontAwesomeIcon icon="fa-regular fa-clock" /> {recipe.readyInMinutes}</span>
                            </div>
                        </div>
                        <div className={`detail-items`}>
                            <div className=" detail detail-punctuation mb-1">
                                <h3 className="mb-1">Score</h3>
                                <span className="chips"><FontAwesomeIcon icon="fa-solid fa-star" size={`lg`}/> {recipe.spoonacularScore}</span>
                            </div>
                            <div className="detail detail-nivel-saludable mb-2">
                                <h3 className="mb-1">Health Score</h3>
                                <span className="chips"><FontAwesomeIcon icon="fa-brands fa-gratipay" size={`lg`}/> {recipe.healthScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`detail-otros`}>
                    <div className="detail detail-dishTypes mb-2">
                        <h3 className="mb-1">Type Dishes</h3>
                        {recipe.dishTypes.map( tp => <span key={tp} className="chips">{tp}</span>)}
                    </div>
                    <div className="detail detail-diets mb-2">
                        <h3 className="mb-1">Type Diets</h3>
                        {!recipe.origin ? recipe.diets.map( dt => <span key={dt} className="chips">{dt}</span>) : recipe.diets.map( dt => <span key={dt.id} className="chips">{dt.name}</span>)}
                    </div>
                    <div className="detail detail-summary mb-2">
                        <h1>Summary</h1>
                        <p>{parse(recipe.summary)}</p>
                    </div>

                    <div className="detail detail-summary mb-1">
                        <h1>Instructions</h1>
                        <p>{/*parse(recipe?.instructions.replace(/\./g, '.<br /><br />'))*/}</p>
                        <p>{recipe.instructions && parse(recipe.instructions)}</p>
                    </div>
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