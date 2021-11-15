import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import {closeMessage} from "../../actions";

const ModalMessage = ({message, error, closeMessage}) => {
    const obj = {
        open: false,
        message: '',
        error: false
    }

    return(
        <div className="modalBackGround">
            <div className="modalContainer">
                <div className="modalTitleBtn">
                    <button onClick={() => closeMessage(obj)}>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </button>
                </div>
                <div className="modalTitle mb-1">
                    <h2 className={error ? 'text-error' : 'text-success'}>{error ? "ERROR" : "SUCCESS"}</h2>
                </div>
                <div className="modalBody">
                    <h5>{message}</h5>
                </div>
                <div className="modalFooter">
                    <button type="button" className="btnClose" onClick={() => closeMessage(obj)}>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" /> &nbsp;
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return{
        closeMessage: (obj) => dispatch(closeMessage(obj))
    }
}

export default connect(null, mapDispatchToProps)(ModalMessage)