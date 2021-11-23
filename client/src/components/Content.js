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

import fondo from '../assets/img/pattern1.png'
/*
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = key => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};
*/

const Content = ({getRecipesAll, getRecipes, listRecipes, loading, registerFavorite}) => {
    const [recipe , setRecipe] = React.useState({});

    /** Sort */
    const { items, requestSort, sortConfig } = useSorData(listRecipes);
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    /** Paginate **/
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPorPage, setItemsPorPage] = useState(9)//Items por página

    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);//Limite de numero por pagina
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const [sidebar, setSidebar] = useState(false);

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const pages = []
    for (let i = 1; i <= Math.ceil(items.length/itemsPorPage) ; i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPorPage //5*10 = 50
    const indexOfFirstItem = indexOfLastItem - itemsPorPage
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

    const renderPageNumbers = pages.map(number =>{
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return(<li
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? 'active' : ''}>{number}</li>)
        }else{
            return null
        }
    } )

    const handleChange = (e) => {
        setRecipe({
            ...recipe, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getRecipes(recipe)
    }

    useEffect(() => {
        //if(listRecipes.length === 0 ){
            getRecipesAll();
        //}
    }, []);

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        if(currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
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
        pageIncrement = <li onClick={handleNext}><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></li>
    }

    let pageDecrement = null;
    if(minPageNumberLimit >= 1 ){
        pageDecrement = <li onClick={handlePrev}><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></li>
    }

    const changeLimit = (e) => {
        e.preventDefault()
        setItemsPorPage(e.target.value);
    }

    return(
        <div className="container" style={{backgroundImage: `url(${fondo})`, minHeight: '92.8vh'}}>
            <Link to="/recipes/create-recipe" className={`btn-float-rb md-tooltip--left`} data-md-tooltip="Create Recipe">
                <FontAwesomeIcon icon="fa-solid fa-plus" size="2x"/>
            </Link>

            <NavDiets sidebar={sidebar} setSidebar={setSidebar}/>

            <div className={sidebar ? 'content active' : 'content'}>
                <div className="actions">
                    <form onSubmit={handleSubmit}>
                        <div className="search">
                            <input type="search" placeholder="Search" name="name" value={recipe.name} onChange={handleChange}/>
                            <button type="submit" className="btn">
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg"/>
                            </button>
                        </div>
                    </form>
                    <form>
                        <div className="items-pages">
                            <label htmlFor="itemsPorPage">Show </label>
                            <select name="itemsPorPage" defaultValue={itemsPorPage} id="itemsPorPage"
                                    onChange={changeLimit}>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                                <option value="18">18</option>
                            </select>
                            <label htmlFor="itemsPorPage"> entries</label>
                        </div>
                    </form>

                    <Paginate
                        handlePrev={handlePrev}
                        pageDecrement={pageDecrement}
                        renderPageNumbers={renderPageNumbers}
                        pageIncrement={pageIncrement}
                        currentPage={currentPage}
                        handleNext={handleNext}
                        pages={pages}/>

                    <div className="order">
                        <button type="button" data-md-tooltip="Order Desc/Asc"
                                onClick={() => requestSort("title")}
                                className={`md-tooltip ${getClassNamesFor("title")}`}>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-up-a-z" size="lg"/> &nbsp;
                            <FontAwesomeIcon icon="fa-solid fa-arrow-down-z-a" size="lg"/>
                        </button>
                        <button type="button" data-md-tooltip="Order Score"
                                onClick={() => requestSort("spoonacularScore")}
                                className={`md-tooltip ${getClassNamesFor("spoonacularScore")}`}>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-up-1-9" size="lg"/> &nbsp;
                            <FontAwesomeIcon icon="fa-solid fa-arrow-down-9-1" size="lg"/>
                        </button>
                    </div>
                </div>
                <div style={{paddingTop:"0"}}>
                    {loading ? <Loading/> : currentItems.length === 0 ? <EmptyData/> : <div className="reviews">{currentItems?.map( rc =>
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