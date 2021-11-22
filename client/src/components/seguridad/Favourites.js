import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import { getFavorites } from "../../actions/auth";

import Loading from "../Loading";
import EmptyData from "../EmptyData";
import NavDiets2 from "./NavDiets2";
import CardFavorites from "./CardFovorites";

const Favourites = ({getFavorites, listFavorites, loading}) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [sidebar, setSidebar] = useState(false);
    useEffect(() => {
        getFavorites(currentUser.id);
    }, []);

    return(
        <div className="container">
            <NavDiets2 sidebar={sidebar} setSidebar={setSidebar}/>
            <div className={sidebar ? 'content active' : 'content'}>
                <h1 style={{textAlign:'center'}}>Favorites Recipes of {currentUser.first_name}</h1>
                <div style={{paddingTop:"20px"}}>
                    {loading ? <Loading/> : listFavorites?.length === 0 ? <EmptyData/> :
                        <div className="reviews">{listFavorites.map( rc =>
                        <CardFavorites
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
                        />
                    )}</div>}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        listFavorites: state.auth.favorites,
        loading: state.auth.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getFavorites: userId => dispatch(getFavorites(userId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)