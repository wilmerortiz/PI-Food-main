import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Header from "./components/Header";
import FormRecipes from "./components/formularios/FormRecipes";
import DetailsRecipe from "./components/DetailsRecipe";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
      <React.Fragment>
          <Switch>
              <Route exact path='/' component={LandingPage}/>
              <Route path='/home'>
                  <Header/>
                  <Home/>
              </Route>
              <Route exact path='/recipes/create-recipe'>
                  <Header/>
                  <FormRecipes/>
              </Route>
              <Route path='/recipes/details/:id'>
                  <Header/>
                  <DetailsRecipe/>
              </Route>
              <Route component={PageNotFound}/>
          </Switch>
      </React.Fragment>
  );
}

export default App;
