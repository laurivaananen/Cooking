import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const UserComponent = ({auth}) => {
  return(
  <div className='container' >
    <h1 className='h1' >User Profile</h1>
    <p>{auth.user ? auth.user.username : 'NOTHING'}</p>
  </div>
  )
}

const User = connect(mapStateToProps)(UserComponent);

export default User;