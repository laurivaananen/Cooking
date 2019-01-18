import React from "react";
import List from "./components/List";
import Nav from './components/Nav';
import Login from './components/Login';
import SearchFormComponent from "./components/SearchForm";
import AddRecipe from "./components/AddRecipe";
import { Router, Route } from 'react-router-dom'
import {requireAuthentication} from './components/AuthenticatedComponent';
import history from './history';

const App = () => (
  <div>
    <Router history={history} >
      <div>
        <Nav />
        <Route exact path="/" component={List} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add" component={requireAuthentication(AddRecipe)} />
        {/* <SearchFormComponent />
        <List /> */}
      </div>
    </Router>
  </div>
);

export default App;