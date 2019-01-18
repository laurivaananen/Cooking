import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from '../actions/index'

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login(params) {
      dispatch(login(params));
    },
  }
}

const UserComponent = ({auth}) => {
  return(
  <p>{auth.user ? auth.user.username : 'NOTHING'}</p>
  )
}

const User = connect(mapStateToProps)(UserComponent);

export default User;