import React, {useEffect, useState, useMemo} from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Recipes from "./Recipes";
import useSorData from "./useSorData"
import {getRecipesAll, getRecipes } from "../actions"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loading from "./Loading";
import NavDiets from "./NavDiets";
import EmptyData from "./EmptyData";
import Paginate from "./Paginate";
import Loader from "./Loader";

const Content = ({getRecipesAll, getRecipes, listRecipes, loading}) => {
    const [recipe , setRecipe] = React.useState({});

    /** Sort */
    const { items, requestSort, sortConfig } = useSorData(listRecipes);
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    /** Search by name */
    const handleChange = (e) => {
        setRecipe({
            ...recipe, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getRecipes(recipe)
    }

    /** Cargamos la lista de Recetas  */
    useEffect(() => {
        if(listRecipes.length === 0) {
            getRecipesAll();
        }
    }, []);

    /** Active y desactive navbar **/
    const [sidebar, setSidebar] = useState(false);

    /** Paginate **/
    const [currentPage, setCurrentPage] = useState(1) // Número de página inicial
    const [itemsPorPage, setItemsPorPage] = useState(9) // Items por página

    const [pageNumberLimit, setPageNumberLimit] = useState(4); // Numero de paginas top
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3); // Limite de numero por pagina
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const pages = []
    for (let i = 1; i <= Math.ceil(items.length/itemsPorPage) ; i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPorPage // 1*9=9, 2*9=18, 3*9=27 ...
    const indexOfFirstItem = indexOfLastItem - itemsPorPage // 9-9=0, 18-9=9, 27-9=18 ...
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem) //Sacamos 9 registros, 9 registros ...

    const renderPageNumbers = pages.map(page =>{
        if(page < maxPageNumberLimit + 1 && page > minPageNumberLimit){
            return(<li
                key={page}
                id={page}
                onClick={handleClick}
                className={currentPage === page ? 'active' : ''}>{page}</li>)
        }else{
            return null
        }
    } )

    const handleNext = () => {
        setCurrentPage(currentPage + 1) // Actualizamos el estado del numero de pagina active
        if(currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit); // 3+3=6, 6+3=9 ...
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit); // 0+3=3, 3+3=6 ...
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
        if((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    let pageIncrement = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrement = (<li onClick={handleNext}><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></li>)
    }

    let pageTop = null;
    if(pages.length > maxPageNumberLimit){
        pageTop = (<li
            key={pages.length}
            id={pages.length}
            onClick={handleClick}
            className={currentPage === pages.length ? 'active' : ''}>{pages.length}</li>)
    }

    let pageDecrement = null;
    if(minPageNumberLimit >= 1 ){
        pageDecrement = <li onClick={handlePrev}><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></li>
    }

    let pageInit = null;
    if(minPageNumberLimit >= 1){
        pageInit = (<li
            key={1}
            id={1}
            onClick={handleClick}
            className={currentPage === 1 ? 'active' : ''}>{1}</li>)
    }

    const changeLimit = (e) => {
        e.preventDefault()
        setItemsPorPage(Number(e.target.value));
    }

    return(
        <div className="container" style={{ minHeight: '92.8vh'}}>
            <Link to="/recipes/create-recipe" className={`btn-float-rb md-tooltip--left`} data-md-tooltip="Create Recipe">
                <FontAwesomeIcon icon="fa-solid fa-plus" size="2x"/>
            </Link>

            <NavDiets sidebar={sidebar} setSidebar={setSidebar}/>

            <div className={sidebar ? 'content active' : 'content'}>
                <div className="actions">
                    <form onSubmit={handleSubmit}>
                        <div className="search">
                            <input type="search" placeholder="Search by Name Recipe " name="name" value={recipe.name} onChange={handleChange}/>
                            <button type="submit" className="btn">
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg"/>
                            </button>
                        </div>
                    </form>
                    <form>
                        <div className="items-pages">
                            <label htmlFor="itemsPorPage">Showing </label>
                            <select name="itemsPorPage" defaultValue={itemsPorPage} id="itemsPorPage"
                                    onChange={changeLimit}>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                                <option value="18">18</option>
                            </select>
                            <label htmlFor="itemsPorPage"> records </label>
                            <label htmlFor=""> &nbsp; of {items.length} Total</label>
                        </div>
                    </form>

                    <Paginate
                        handlePrev={handlePrev}
                        pageDecrement={pageDecrement}
                        renderPageNumbers={renderPageNumbers}
                        pageIncrement={pageIncrement}
                        currentPage={currentPage}
                        pageInit={pageInit}
                        pageTop={pageTop}
                        handleNext={handleNext}
                        pages={pages}
                    />

                    <div className="order">
                        <button
                            type="button"
                            data-md-tooltip="Order Desc/Asc"
                            onClick={() => requestSort("title")}
                            className={`md-tooltip ${getClassNamesFor("title")}`}>
                            {getClassNamesFor("title") === 'ascending' ?
                                (<FontAwesomeIcon icon="fa-solid fa-arrow-up-a-z" size="lg"/>) :
                                (<FontAwesomeIcon icon="fa-solid fa-arrow-down-z-a" size="lg"/>)
                            }
                        </button>

                        <button
                            type="button"
                            data-md-tooltip="Order Score"
                            onClick={() => requestSort("spoonacularScore")}
                            className={`md-tooltip ${getClassNamesFor("spoonacularScore")}`}>
                            {getClassNamesFor("spoonacularScore") === 'ascending' ?
                                (<FontAwesomeIcon icon="fa-solid fa-arrow-up-1-9" size="lg"/>) :
                                (<FontAwesomeIcon icon="fa-solid fa-arrow-down-9-1" size="lg"/>)
                            }
                        </button>
                    </div>
                </div>
                <div style={{paddingTop:"0"}}>
                    {loading ? <Loader/> : currentItems.length === 0 ? <EmptyData/> : <div className="reviews">{currentItems?.map( rc =>
                        <Recipes
                            key={rc.id}
                            id={rc.id}
                            title={rc.title}
                            img={rc.image}
                            dishTypes={rc.dishTypes}
                            diets={ rc.origin ? rc.diets?.map(diet => [diet.name]) : rc.diets}
                            origin={rc.origin ? rc.origin : 'API'}
                            score={rc.spoonacularScore}
                            readyInMinutes={rc.readyInMinutes}
                            servings={rc.servings}
                            createdAt={rc.createdAt}
                        />
                        )}</div>}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        listRecipes: state.recipe.recipesLoaded,
        loading: state.recipe.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipes: title => dispatch(getRecipes(title)),
        getRecipesAll: () => dispatch(getRecipesAll())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)