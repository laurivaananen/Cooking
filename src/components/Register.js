import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from '../actions/index'

const mapStateToProps = state => {
  return {
    registerState: state.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register(params) {
      dispatch(register(params));
    },
  }
}

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.search.replace('?next=', '') || '/';
    this.state = {
      username: {value: '', errors: []},
      password: {value: '', errors: []},
      redirectTo: redirectRoute
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      username: this.state.username.value,
      password: this.state.password.value
    }
    this.props.register(params);
  }

  handleChange(event) {
    this.setState({[event.target.name]: {...this.state[event.target.name], value: event.target.value}});
  }

  render() {
    return(
      <form className="container" onSubmit={this.handleSubmit} >
        <div className="field">
          <label className="label" htmlFor='login-username'>Username</label>
          <div className="control">
            <input className="input" id='login-username' name='username' type='text' value={this.state.username.value} onChange={this.handleChange} />
          </div>
        {this.props.registerState.errors.username && this.props.registerState.errors.username.map((x, id) => <p key={id} className="help is-danger" >{x}</p>)}
        </div>
        <div className="field">
          <label className="label" htmlFor='login-password'>Password</label>
          <div className="control">
            <input className="input" id='login-password' name='password' type='text' value={this.state.password.value} onChange={this.handleChange} />
          </div>
        {this.props.registerState.errors.password && this.props.registerState.errors.password.map((x, id) => <p key={id} className="help is-danger" >{x}</p>)}
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">Register</button>
          </div>
        </div>
      </form>
    )
  }
}

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);

export default Register;