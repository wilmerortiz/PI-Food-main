import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './UserCard.css';
import {Link} from "react-router-dom";
import React from "react";
const Users = () => {
    return(
        <>
            <Link to="/users/register" className={`btn-float-rb md-tooltip--left`} data-md-tooltip="Register User">
                <FontAwesomeIcon icon="fa-solid fa-user-plus" size="2x"/>
            </Link>
            <div className="container container-card">
                <div className="grid-77 element-animation">
                    <div className="card-user color-card-2">

                        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-pic" className="profile"/>
                        <h1 className="title-2">Bevely Little</h1>
                        <p className="job-title"> SENIOR PRODUCT DESIGNER</p>
                        <div className="desc top">
                            <p>Create usable interface and designs @GraphicSpark</p>
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

            </div>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400" rel="stylesheet"/>
        </>
    )
}

export default Users