import React from "react"
import './PageNotFound.css'
import fondo from "../assets/fondo2.jpg";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageNotFound = () => {

//Fragment
    return (
        <>

            <section className="hero" style={{display: 'flex'}}>
                <div className="background-image" style={{backgroundImage: `url(${fondo})`}}>-</div>
                <h1 className="page-404">

                    4<FontAwesomeIcon icon="fa-solid fa-bell-concierge" />4
                </h1>
                <h3> PAGE NOT FOUND</h3>
                <Link to='/home' className="btn btn-primary btn-lg">
                    <FontAwesomeIcon icon="fa-solid fa-rotate-left" size="lg" /> &nbsp; GO HOME
                </Link>
            </section>

        </>
    )
}

export default PageNotFound