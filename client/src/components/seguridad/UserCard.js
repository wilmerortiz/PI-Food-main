import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserCard = ({id, firstName, lastName, email, role}) => {
    return(
        <>
            <div className="grid-77 element-animation">
                <div className="card-user color-card-2">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-pic" className="profile"/>
                    <h1 className="title-2">{firstName}</h1>
                    <h1 className="title-2">{lastName}</h1>
                    <p className="job-title"> {role}</p>
                    <div className="desc top">
                        <p>{email}</p>
                    </div>
                    <button className="btn top">
                        <FontAwesomeIcon icon="fa-solid fa-user-gear" /> View Profile
                    </button>

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
                </div>
            </div>
        </>
    )
}

export default UserCard