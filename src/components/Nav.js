import React, { Component } from "react";
import { connect } from "react-redux";
import User from './User';
import { getRecipes, getMoreRecipes } from '../actions/index'
import { NavLink } from 'react-router-dom'
import permissionRequired from './AuthOrRedirect';
import { logout } from '../actions';

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout(token) {
      dispatch(logout(token));
    },
  }
}

const NavComponent = ({auth, logout}) => (
  <nav>
    <NavLink to="/" >Home</NavLink>
    <NavLink to="/search" >Search</NavLink>
    <NavLink to="/add" >Add</NavLink>
    {auth.user ? <NavLink to="/user/">{auth.user.username}</NavLink> : <NavLink to="/registe/">Register</NavLink>}
    {auth.user ? <a href="" onClick={event => {event.preventDefault(); logout(auth.token);}}>Logout</a> : <NavLink to="/login/">Login</NavLink>}
  </nav>
)

const Nav = connect(mapStateToProps, mapDispatchToProps)(NavComponent)

export default Nav;