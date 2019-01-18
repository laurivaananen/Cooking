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

class AddRecipeComponent extends Component {
  constructor(props) {
    super(props);
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
  }


  render() {
    return(
      <h1>Auth</h1>
    )
  }
}

const AddRecipe = connect(mapStateToProps, mapDispatchToProps)(AddRecipeComponent);

export default AddRecipe;