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

  componentDidMount() {
    console.log("MOUNTED");
    console.log(this.props.auth);
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit} >
        <label htmlFor='login-username'>Username</label>
        <input id='login-username' name='username' type='text' value={this.state.value} onChange={this.handleChange} />
        <br />
        <label htmlFor='login-password'>Password</label>
        <input id='login-password' name='password' type='password' value={this.state.value} onChange={this.handleChange} />
        <br />
        <button type="submit">Login</button>
        {this.props.auth.errors && 
          <ul>
            {this.props.auth.errors.map(error => (
              <li key={error} >{error}</li>
            ))}
          </ul>
        }
      </form>
    )
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default Login;