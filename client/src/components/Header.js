import React from "react";
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";

const Header = () => {
    return(
        <header>
            <h2>
                <Link to="/home">FOODS</Link>
            </h2>

            <nav>

                <li>
                    <Link to="/recipes/favorites" className={`md-tooltip`} data-md-tooltip="Recipes Favorites">
                        <FontAwesomeIcon icon="fa-regular fa-heart"  size="lg"/>
                    </Link>
                </li>
                <li>
                    <Link to="/recipes/create-recipe" className={`md-tooltip`} data-md-tooltip="Create Recipe">
                        <FontAwesomeIcon icon="fa-solid fa-plus" size="lg"/>
                    </Link>
                </li>
                <li>
                    <Link to="users/login" className={`md-tooltip`} data-md-tooltip="Login">
                        <FontAwesomeIcon icon="fa-solid fa-user-lock" size="lg"/>
                    </Link>
                </li>
            </nav>
        </header>
    )
}
export default Header