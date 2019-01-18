import React, { Component } from "react";
import { connect } from "react-redux";
import User from './User';
import { getRecipes, getMoreRecipes } from '../actions/index'
import { NavLink } from 'react-router-dom'
import permissionRequired from './AuthOrRedirect';

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const NavComponent = ({auth}) => (
  <nav>
    <NavLink to="/" >Home</NavLink>
    <NavLink to="/search" >Search</NavLink>
    <NavLink to="/add" >Add</NavLink>
    {auth.user ? <NavLink to="/user/">{auth.user.username}</NavLink> : <NavLink to="/registe/">Register</NavLink>}
    {auth.user ? <NavLink to="/logout/">Logout</NavLink> : <NavLink to="/login/">Login</NavLink>}
  </nav>
)

const Nav = connect(mapStateToProps)(NavComponent)

export default Nav;