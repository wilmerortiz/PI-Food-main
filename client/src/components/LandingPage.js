import React from "react";
import {Link} from "react-router-dom";
//import fondo from '../assets/hero.jpg'
import fondo from '../assets/fondo2.jpg'

const LandingPage = () => {
    return(
        <>
            <section className="hero" style={{display: 'flex'}}>
                <div className="background-image" style={{backgroundImage: `url(${fondo})`}}>-</div>
                <h1>WELCOME </h1>
                <h3>Find the best recipes for your kitchen</h3>
                <Link to='/home' className="btn btn-primary btn-lg">
                    EXPLORE RECIPES
                </Link>
            </section>
        </>
    )
}

export default LandingPage