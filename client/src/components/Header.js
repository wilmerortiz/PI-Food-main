import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import logo from "../assets/img/cooking.png"
const Header = () => {
    return(
        <header>
            <div className="header-logo">
                <img src={logo} alt="logo" className="logo"/>
                <h2>
                    <Link to="/home">FOOD APP</Link>
                </h2>
            </div>

            <nav>

                <li>
                    <Link to="/recipes/favorites" className={`md-tooltip`} data-md-tooltip="Recipes Favorites">
                        <FontAwesomeIcon icon="fa-regular fa-heart"  size="lg"/>
                    </Link>
                </li>

                    <li>
                        <Link to="/users" className={`md-tooltip`} data-md-tooltip="Users">
                            <FontAwesomeIcon icon="fa-solid fa-users" size={`lg`}/>
                        </Link>
                    </li>

                <li>
                    <Link to="/users/login" className={`md-tooltip`} data-md-tooltip="Login">
                        <FontAwesomeIcon icon="fa-solid fa-user-lock" size="lg"/>
                    </Link>
                </li>
            </nav>
        </header>
    )
}
export default Header