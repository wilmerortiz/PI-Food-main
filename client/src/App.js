import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Header from "./components/Header";
import Users from "./components/seguridad/Users";
import FormRecipes from "./components/formularios/FormRecipes";
import DetailsRecipe from "./components/DetailsRecipe";
import PageNotFound from "./components/PageNotFound";
import AddUser from "./components/seguridad/AddUser";
import Login from "./components/seguridad/Login";
import UserProfile from "./components/seguridad/UserProfile";
import Favourites from "./components/seguridad/Favourites"
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
              <Route exact path='/recipes/details/:id'>
                  <Header/>
                  <DetailsRecipe/>
              </Route>
              <Route exact path='/recipes/favorites'>
                  <Header/>
                  <Favourites/>
              </Route>
              <Route exact path='/users'>
                  <Header/>
                  <Users/>
              </Route>
              <Route exact path='/users/register'>
                  <Header/>
                  <AddUser/>
              </Route>
              <Route exact path='/users/login'>
                  <Header/>
                  <Login/>
              </Route>
              <Route exact path='/users/profile'>
                  <Header/>
                  <UserProfile/>
              </Route>
              <Route component={PageNotFound}/>
          </Switch>
      </React.Fragment>
  );
}

export default App;
