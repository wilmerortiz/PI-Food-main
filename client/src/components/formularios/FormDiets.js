import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addDietDB, getDietsAll} from "../../actions"
import {connect} from "react-redux";
import {validate} from "../validate/ValidateFormDiet"
const FormDiets = ({closeModal, addDietDB, getDietsAll, modalClose, opacity, visibility}) => {
    const [diet, setDiet] = useState({
        name: '',
        description: ''
    });

    const [errors, setErrors] = React.useState({
        name: 'Name en required',
        description: 'Description en required'
    });

    const handleChange = (e) => {
        setDiet({
            ...diet, [e.target.name]: e.target.value
        })

        /* Control de errores */

        setErrors(validate({
            ...diet,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( Object.keys(errors).length === 0 ){
            await addDietDB(diet);
            closeModal(false);
            getDietsAll();
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="modalBackGround" style={{opacity: opacity, visibility: visibility}}>
                <div className={`modalContainer ${modalClose}`} id="modalContainer">
                    <div className="modalTitleBtn">
                        <button onClick={() => closeModal(false)}>
                            <FontAwesomeIcon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div className="modalTitle mb-1">
                        <h2>Add Type Diet</h2>
                    </div>
                    <div className="modalBody">
                        <div className={`${errors.name && 'input-danger'} wrap-input bg1`} style={{width: '100%'}}>
                            <label htmlFor="name" className="label-input">Name</label>
                            <input type="text" name="name" className="input" id="name"
                                   value={diet.name}
                                   onChange={handleChange}/>

                            {errors.name && (
                                <p className="validate-danger"><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {errors.name}</p>
                            )}

                        </div>

                        <div className={`${errors.description && 'input-danger'} wrap-input bg1`} style={{width: '100%'}}>
                            <label htmlFor="description" className="label-input">Description</label>
                            <textarea name="description" className="input" id="description"
                                      value={diet.description}
                                      onChange={handleChange}/>

                            {errors.description && (
                                <p className="validate-danger"><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {errors.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="modalFooter">
                        <button type="submit">Save <FontAwesomeIcon icon="fa-regular fa-floppy-disk" /></button>
                        <button type="button" className="btnClose" onClick={() => closeModal(false)}>
                            Cancel <FontAwesomeIcon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

function mapStateToProps(state){
    return {
        listDiets: state.dietsLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDietDB: diet => dispatch(addDietDB(diet)),
        getDietsAll: () => dispatch(getDietsAll())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDiets)