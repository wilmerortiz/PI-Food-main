import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { registerFavorite } from "../actions/auth"
import {Report} from "notiflix/build/notiflix-report-aio";
import { clearMessage } from "../actions/message";

//import { Loading } from 'notiflix/build/notiflix-loading-aio';

const Recipes = ({id, title, img, dishTypes, diets, origin, score, readyInMinutes, servings, createdAt, registerFavorite}) => {

    const { user: currentUser } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const { message } = useSelector(state => state.message);
    //const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const addFavorites = (recipeId) => {
        setLoading(true);
        if (!currentUser) {
            setLoading(false);
            Report.failure('WARNING', 'Inicie sesión para agregar a favoritos', 'OK', function cb() {
                return <Redirect to="/users/login" />;
            });

            return;
        }

        let datos = {userId: currentUser.id, recipeId: recipeId}

        registerFavorite(datos)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function calculardiasDiscount() {
        var timeStart = new Date(createdAt);
        var timeEnd = new Date();
        var actualDate = new Date();
        if (timeEnd > timeStart)
        {
            var diff = timeEnd.getTime() - timeStart.getTime();
            let time = Math.round(diff / (1000 * 60 * 60 * 24));
            return time;
        }

    }

    return(
        <>
        <div className={`card zoom`}>
            <div className={`card-image`} style={{backgroundImage: `url(${img})`}}>
                {calculardiasDiscount() <= 1 ? <h3 className={`span-new`}>
                    <FontAwesomeIcon className={`swing`} icon="fa-solid fa-bell" size={`lg`}/> &nbsp; New Recipe
                </h3> : '' }

            </div>
            <div className={`card-body`}>
                <div className={`md-tooltip`} data-md-tooltip={title}>
                    <h3 >{title}</h3>
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
                        <span className="chips-sm">
                            <FontAwesomeIcon icon="fa-solid fa-star" size={`lg`} style={{color: 'gold'}}/>
                             {5*score/100} ({score})
                        </span>
                    </div>
                </div>
                <div className={`card-button`}>
                    <Link to={`/recipes/details/${id}?origin=${origin}`}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-info" size="lg" /> Details
                    </Link>
                    <button onClick={() => addFavorites(id)} disabled={loading}>
                        {loading ? (
                            <FontAwesomeIcon icon="fa-solid fa-circle-notch" size="lg" />
                        ) : (<FontAwesomeIcon icon="fa-solid fa-heart" size="lg" />)}
                         &nbsp;Favorite
                    </button>
                </div>
            </div>
        </div>
            {message && Report.success('SUCCESS', message, 'OK', function cb() {
                dispatch(clearMessage());
            })}
        </>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        registerFavorite: datos => dispatch(registerFavorite(datos)),
    };
}

export default connect(null, mapDispatchToProps)(Recipes)