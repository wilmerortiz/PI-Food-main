import React from "react";
import { Route } from "react-router-dom";

import Content from "./Content";

const Home = () => {
    return(
        <>
            <Route exact path='/home' component={Content} />
        </>
    )
}

export default Home