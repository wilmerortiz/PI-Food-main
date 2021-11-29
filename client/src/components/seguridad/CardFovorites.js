import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {Report} from "notiflix/build/notiflix-report-aio";
import { clearMessage } from "../../actions/message";

const CardFavorites = ({id, title, img, dishTypes, diets, origin, score, readyInMinutes, servings, createdAt, deleteFavorite}) => {

    const { user: currentUser } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const { message } = useSelector(state => state.message);
    //const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const removeFavorites = (recipeId) => {
        setLoading(true);
        if (!currentUser) {
            setLoading(false);
            Report.failure('WARNING', 'Inicie sesión para agregar a favoritos', 'OK', function cb() {
                return <Redirect to="/users/login" />;
            });

            return;
        }

        let datos = {userId: currentUser.id, recipeId: recipeId}

        deleteFavorite(datos)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function calculardiasDiscount() {
        let timeStart = new Date(createdAt);
        let timeEnd = new Date();
        if (timeEnd > timeStart)
        {
            let diff = timeEnd.getTime() - timeStart.getTime();
            let time = Math.round(diff / (1000 * 60 * 60 * 24));
            console.log(time)
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
                            <span className="chips-sm">
                                <FontAwesomeIcon icon="fa-solid fa-star" size={`lg`}/>
                                {5*score/100}
                            </span>
                        </div>
                    </div>
                    <div className={`card-button`}>
                        <Link to={`/recipes/details/${id}?origin=${origin}`} style={{width: '90%'}}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" size="lg" /> Details
                        </Link>
                        {/*
                        <button onClick={() => removeFavorites(id)} disabled={loading}>
                            {loading ? (
                                <FontAwesomeIcon icon="fa-solid fa-circle-notch" size="lg" />
                            ) : (<FontAwesomeIcon icon="fa-solid fa-trash" size={`lg`}/>)}
                            &nbsp;Remove
                        </button>
                        */}
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

    /*
    return {
        registerFavorite: datos => dispatch(registerFavorite(datos)),
    };

     */
}

export default connect(null, null)(CardFavorites)