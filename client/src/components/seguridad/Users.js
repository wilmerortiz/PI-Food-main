import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './UserCard.css';
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getUsers } from "../../actions/auth";
import UserCard from "./UserCard";

const Users = () => {
    const users = useSelector(state => state.auth.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return(
        <>
            <Link to="/users/register" className={`btn-float-rb md-tooltip--left`} data-md-tooltip="Register User">
                <FontAwesomeIcon icon="fa-solid fa-user-plus" size="2x"/>
            </Link>
            <div className="container container-card">
            {users && users?.map(user =>
                <UserCard
                    key={user.id}
                    id={user.id}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                    role={user.role}
                />
            )}
            </div>
        </>
    )
}

export default Users