import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserProfile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/users/login" />;
    }

    return (
        <section >
            <div className="grid-77 element-animation">
                <div className="card-user color-card-2">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-pic" className="profile"/>
                    <h1 className="title-2">{currentUser.first_name}</h1>
                    <h2 className="title-2">{currentUser.last_name}</h2>
                    <h3>
                        Profile: <strong>{currentUser.username}</strong>
                    </h3>

                    <h3><strong>Email:</strong> {currentUser.email}</h3>

                    <p>
                        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <h3>
                        <strong>Id:</strong> {currentUser.id}
                    </h3>

                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li className={`chips-sm`} key={index}>{role}</li>)}
                    </ul>
                    {/*
                    <div className="container">
                        <div className="content-actions-users">
                            <div className="grid-2">
                                <button className="color-b circule">
                                    <FontAwesomeIcon icon="fa-solid fa-user-xmark" size={`2x`}/>
                                </button>
                            </div>
                            <div className="grid-2">
                                <button className="color-c circule">
                                    <FontAwesomeIcon icon="fa-solid fa-user-pen" size={`2x`} />
                                </button>
                            </div>
                            <div className="grid-2">
                                <button className="color-d circule">
                                    <FontAwesomeIcon icon="fa-solid fa-heart" size={`2x`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </div>


        </section>
    );
};

export default UserProfile;
