import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Range from "../Range";
import {addRecipeDB, getDietsAll, getRecipesAll} from "../../actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormDiets from "./FormDiets";
import ModalMessage from "../Flash/modalMessage";
import {validate} from "../validate/ValidateFormRecipe"

const FormRecipes = ({getDietsAll, addRecipeDB, listDiets, getRecipesAll, responses}) => {
    const [recipe , setRecipe] = useState({
        origin: 'LOCAL',
        types: [],
        dishTypes: [],
        spoonacularScore: 0,
        healthScore : 0
    });

    const [errors, setErrors] = React.useState({
        image: 'URL Picture is required',
        name: 'Title is required',
        summary: 'Summary is required'
    });

    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e) => {
        setRecipe({
            ...recipe, [e.target.name]: e.target.value
        })

        /* Control de errores */

        setErrors(validate({
            ...recipe,
            [e.target.name]: e.target.value
        }));
    }

    const handleChecked =  (e) => {
        //console.log(e.target.checked)
        let param = e.target.name
        if(e.target.checked){
            recipe[param].push(parseInt(e.target.value))
        }else{
            let index = recipe[param].indexOf(parseInt(e.target.value));

            if (index > -1) {
                recipe[param].splice(index, 1);
            }
        }

        setRecipe({
            ...recipe, [e.target.name]: recipe.types
        })
    }

    function getScore(e) {
        let spoonacularScore = Number(e.target.value);
        setRecipe({
            ...recipe, spoonacularScore: spoonacularScore
        })
    }

    function getHealthScore(e) {
        let healthScore = Number(e.target.value);
        setRecipe({
            ...recipe, healthScore: healthScore
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( Object.keys(errors).length === 0 ){
            await addRecipeDB(recipe);
            getRecipesAll();
        }
    }

    useEffect(() => {
        getDietsAll();
    }, []);

    return(
        <>
            {responses.open && <ModalMessage message={responses.message} error={responses.error} />}
            {/*openModal && <FormDiets opacity={1} visibility="visible" closeModal={setOpenModal} modalClose={openModal ? '' : 'modalClose'} />*/}
            <FormDiets opacity={openModal ? 1 : 0} visibility={openModal ? 'visible' : 'hidden'} closeModal={setOpenModal} modalClose={openModal ? '' : 'modalClose'} />
            <section>
            <div className="formulario">
                <form onSubmit={handleSubmit} className="form">

                    <span className="form-title">
                        Create Recipe
                    </span>

                    <div className={`${errors.image && 'input-danger'} wrap-input bg1`}>
                        <label htmlFor="image" className="label-input">URL de Imagen</label>
                        <input type="text" name="image" className="input" id="image"
                               value={recipe.image}
                               onChange={handleChange}/>
                        {errors.image && (
                            <p className="validate-danger"><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {errors.image}</p>
                        )}
                    </div>
                    <div className={`${errors.name && 'input-danger'} wrap-input bg1`}>
                        <label htmlFor="title" className="label-input">Title</label>
                        <input type="text" name="name" className="input" id="title"
                               value={recipe.name}
                               onChange={handleChange}/>
                        {errors.name && (
                            <p className="validate-danger"><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {errors.name}</p>
                        )}
                    </div>
                    <div className={`${errors.summary && 'input-danger'} wrap-input bg1`}>
                        <label htmlFor="summary" className="label-input">Summary</label>
                        <textarea name="summary" className="input" id="summary"
                                  value={recipe.summary}
                                  onChange={handleChange}/>
                        {errors.summary && (
                            <p className="validate-danger"><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {errors.summary}</p>
                        )}
                    </div>

                    <div className="wrap-form-range mb-1">

                        <Range
                            getScore={getScore}
                            getHealthScore={getHealthScore}
                            Score={recipe.spoonacularScore}
                            HealthScore={recipe.healthScore}
                        />

                    </div>
                    <div className="wrap-input bg1">
                        <label htmlFor="level_healthy_food" className="label-input">Instructions</label>
                        <textarea name="instructions" className="input" id="instructions"
                                  value={recipe.instructions}
                                  onChange={handleChange}/>
                    </div>

                    <div className="wrap-form-checkbox">
                        <label className="label-input mb-1">Select diet type</label>

                        <div className="tipo-dietas">

                            {listDiets?.map( diet => (
                                <div className="form-checkbox" key={diet.id}>
                                    <input type="checkbox" className="input-checkbox cb-types" name="types" value={diet.id} id={`types-${diet.id}`}
                                           onChange={handleChecked}/>
                                    <label htmlFor={`types-${diet.id}`} className="label-checkbox">{diet.name}</label>
                                </div>
                            ) )}
                            <div className="div-new">
                                <button type="button" className="btn btn-sm btn-block"
                                onClick={() => {
                                    setOpenModal(true)
                                }}>
                                    <FontAwesomeIcon icon="fa-solid fa-plus" /> New
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container-form-btn">
                        <button className="btn-form" type="submit">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk" size="lg" /> &nbsp;  &nbsp; SAVE RECIPE
                        </button>
                    </div>
                </form>
            </div>

        </section>
        </>
    )
}

function mapStateToProps(state) {
    return {
        listDiets: state.recipe.dietsLoaded,
        responses: state.recipe.$responses,
        loading: state.recipe.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipeDB: recipe => dispatch(addRecipeDB(recipe)),
        getDietsAll: () => dispatch(getDietsAll()),
        getRecipesAll: () => dispatch(getRecipesAll()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FormRecipes)