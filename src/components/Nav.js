import React, { Component } from "react";
import { connect } from "react-redux";
import User from './User';
import { getRecipes, getMoreRecipes } from '../actions/index'
import { NavLink } from 'react-router-dom'
import permissionRequired from './AuthOrRedirect';
import { logout } from '../actions';

const mapStateToProps = state=> {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout(token) {
      dispatch(logout(token));
    },
  }
}

class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick = () => {
    this.setState({expanded: !this.state.expanded});
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout(this.props.auth.token);
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/" >Home</NavLink>
          <a onClick={this.handleClick} role="button" className={"navbar-burger burger " + (this.state.expanded ? 'is-active' : '')} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={'navbar-menu' + (this.state.expanded ? 'is-active' : '')}>
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/add" >Add</NavLink>
            {this.props.auth.user ? <NavLink className="navbar-item" to="/user/">{this.props.auth.user.username}</NavLink> : <NavLink className="navbar-item" to="/register/">Register</NavLink>}
            {this.props.auth.user ? <a className="navbar-item" href="" onClick={this.handleLogout}>Logout</a> : <NavLink className="navbar-item" to="/login/">Login</NavLink>}
          
          </div>
          <div className="navbar-end">
          </div>
        </div>
      </nav>
    )
  }
}

const Nav = connect(mapStateToProps, mapDispatchToProps)(NavComponent)

export default Nav;