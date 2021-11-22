import React, {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import logo from "../assets/img/cooking.png"
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";

const Header = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = () => {
        dispatch(logout());
    };

    return(
        <header>
            <div className="header-logo">
                <img src={logo} alt="logo" className="logo"/>
                <h2>
                    <Link to="/home">FOOD APP</Link>
                </h2>
            </div>

            <nav>
                { currentUser &&
                    <li>
                        <Link to="/recipes/favorites" className={`md-tooltip`} data-md-tooltip="Favorites">
                            <FontAwesomeIcon icon="fa-regular fa-heart" size="lg"/>
                        </Link>
                    </li>
                }
                {/*
                <li>
                    <Link to="/users" className={`md-tooltip`} data-md-tooltip="Users">
                        <FontAwesomeIcon icon="fa-solid fa-users" size={`lg`}/>
                    </Link>
                </li>
                */}
                <li>
                    {!currentUser ?
                        <Link to="/users/register" className={`md-tooltip`} data-md-tooltip="Register">
                        <FontAwesomeIcon icon="fa-solid fa-user-plus" size={`lg`}/>
                        </Link> :
                        <Link to="/users/profile" className={`md-tooltip`} data-md-tooltip={`${currentUser.first_name}`}>
                            <FontAwesomeIcon icon="fa-solid fa-user" size={`lg`}/>
                        </Link>
                    }
                </li>

                <li>
                    {!currentUser ?
                        <Link to="/users/login" className={`md-tooltip`} data-md-tooltip="Login">
                        <FontAwesomeIcon icon="fa-solid fa-user-lock" size="lg"/>
                        </Link> :
                        <Link to="/users/login" className={`md-tooltip`} data-md-tooltip="Logout" onClick={logOut}>
                            <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                        </Link>
                    }
                </li>
            </nav>
        </header>
    )
}
export default Header