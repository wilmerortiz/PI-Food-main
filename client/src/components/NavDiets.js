import React, {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import {getDietsAll, filterByDietType, searchDiet} from "../actions"
import {connect} from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../assets/img/cooking.png";
import {Link} from "react-router-dom";

const NavDiets = ({getDietsAll, listDiets, filterByDietType, searchDiet, sidebar, setSidebar}) => {
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    /*const [sidebar, setSidebar] = useState(false);*/
    
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
    
    useEffect(() => {
        getDietsAll()
    }, []);

    useEffect(() => {
        searchDiet(search)
    }, [search]);

    useEffect(() => {
        filterByDietType(filter)
    }, [filter]);

    return(
        <>
            <div className={`show`}>
                <button onClick={showSidebar} className={`showmenu`} >
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                </button>
            </div>

        <div className={sidebar ? 'side-bar active' : 'side-bar'}>

            <div className="nav-header">
                <h3>Filter by diet type</h3>
                <button onClick={showSidebar}>
                    <FontAwesomeIcon icon="fa-solid fa-x" />
                </button>
            </div>

            <ul>
                <li>
                    <form action="">
                        <div className="input-search">
                            <input type="search" className="searchDiet" id="searchDiet" name="dietType"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                                   placeholder="Search Diet Type"/>
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg"/>
                        </div>
                    </form>
                </li>
                <li className={filter.toLowerCase() === 'all' ? 'active' : ''}>
                    <label htmlFor="all" onClick={() => setFilter('All')}>
                        <FontAwesomeIcon icon="fa-solid fa-bell-concierge" size="lg"/>&nbsp; All
                    </label>
                </li>
                {listDiets.map(lt => (
                    <li key={lt.id} className={lt.name.toLowerCase() === filter.toLowerCase() ? 'active' : ''}>
                        <label htmlFor={`radio-dits${lt.id}`} onClick={() => setFilter(lt.name)}>
                            <FontAwesomeIcon icon="fa-solid fa-bell-concierge" size="lg"/>&nbsp; {lt.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        listDiets: state.recipe.dietsLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDietsAll: () => dispatch(getDietsAll()),
        filterByDietType: (filter) => dispatch(filterByDietType(filter)),
        searchDiet: (search) => dispatch(searchDiet(search))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDiets)