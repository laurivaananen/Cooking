import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from '../actions/index'

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login(params) {
      dispatch(login(params));
    },
  }
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.search.replace('?next=', '') || '/';
    this.state = {
      username: '',
      password: '',
      redirectTo: redirectRoute
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(this.state);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  selectCheckbox = event => {
    this.props.changeCheckbox(event.target.id);
  }


  render() {
    return(

      <form className="container" onSubmit={this.handleSubmit} >
        <div className="field">
          <label className="label" htmlFor='login-username'>Username</label>
          <div className="control">
            <input className="input" id='login-username' name='username' type='text' value={this.state.username.value} onChange={this.handleChange} />
          </div>
          {this.props.auth.errors.username && this.props.auth.errors.username.map((x, id) => <p key={id} className="help is-danger" >{x}</p>)}
        </div>
        <div className="field">
          <label className="label" htmlFor='login-password'>Password</label>
          <div className="control">
            <input className="input" id='login-password' name='password' type='text' value={this.state.password.value} onChange={this.handleChange} />
          </div>
          {this.props.auth.errors.password && this.props.auth.errors.password.map((x, id) => <p key={id} className="help is-danger" >{x}</p>)}
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">Login</button>
          </div>
          {this.props.auth.errors.non_field_errors && this.props.auth.errors.non_field_errors.map((x, id) => <p key={id} className="help is-danger" >{x}</p>)}
        </div>
      </form>
    )
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default Login;