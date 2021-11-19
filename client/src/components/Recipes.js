import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Recipes = ({id, title, img, dishTypes, diets, origin, score, readyInMinutes, servings}) => {
    return(
        <div className={`card zoom`}>
            <div className={`card-image`}>
                <img src={img} alt="image"/>
            </div>
            <div className={`card-body`}>
                <div className={`card-title`}>
                    <h3>{title}</h3>
                </div>
                {/*<div className="dishTypes mb-1">
                    <h5>Dishes Types </h5>
                    {dishTypes?.map( tp => <span className="chips-sm">{tp}</span>)}
                </div>*/}
                <div className="diets mb-1">
                    <h5>Diets Types</h5>
                    <div>
                        {diets?.map( dt => <span key={dt} className="chips-sm">{dt}</span>)}
                    </div>
                </div>
                <div className="score">
                    <div>
                        <h5>Servings</h5>
                        <span className={`chips-sm`}><FontAwesomeIcon icon="fa-solid fa-users" size={`lg`}/> {servings}</span>
                    </div>
                    <div>
                        <h5>Ready In Minutes</h5>
                        <span className="chips-sm"><FontAwesomeIcon icon="fa-solid fa-clock" size={`lg`} /> {readyInMinutes}</span>
                    </div>
                    <div>
                        <h5>Score</h5>
                        <span className="chips-sm"><FontAwesomeIcon icon="fa-solid fa-star" size={`lg`}/> {score}</span>
                    </div>
                </div>
                <div className={`card-button`}>
                    <Link to={`/recipes/details/${id}?origin=${origin}`}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-info" size="lg" /> Details
                    </Link>
                    <button><FontAwesomeIcon icon="fa-solid fa-heart" size="lg" /> Favorite</button>
                </div>
            </div>
        </div>
    )
}

export default Recipes