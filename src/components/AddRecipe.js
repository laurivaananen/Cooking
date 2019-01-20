import React, { Component } from "react";
import { connect } from "react-redux";
import { postRecipe, getCategories } from '../actions/index'

const mapStateToProps = state => {
  return {
    auth: state.auth,
    categories: state.categories,
    postRecipeStatus: state.postRecipe,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories() {
      dispatch(getCategories())
    },
    postRecipe(data, token) {
      dispatch(postRecipe(data, token))
    },
  }
}

class AddRecipeComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.categories);
    this.state = {
      recipeTitle: '',
      recipeDescription: '',
      recipeCategory: '',
      recipeIngredient: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.statusMessage = this.statusMessage.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      title: this.state.recipeTitle,
      description: this.state.recipeDescription,
      category: this.state.recipeCategory,
      ingredients: this.state.recipeIngredient,
    }
    this.props.postRecipe(params, this.props.auth.token);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  selectCheckbox = event => {
    this.props.changeCheckbox(event.target.id);
  }

  createInput = (label, name, type, placeholder) => {
    return(
      <div className='input'>
        <label htmlFor={name}>{label}</label>
        <input 
          name={name}
          id={name}
          type={type}
          value={this.state[name]}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
      </div>
    )
  }

  statusMessage = ({isPosting, posted, errors}) => {
    if(isPosting) {
      return <p>Posting your recipe</p>
    } else if (posted) {
      return <p>Succesfully posted your recipe</p>
    } else if (errors.length > 0) {
      return <ul>{errors.map(x => <p>x</p>)}</ul>
    } else {
      return <p>Nothing</p>
    }
  }

  componentDidMount() {
    this.props.getCategories();
    console.log(this.props.categories);
    this.setState({recipeCategory: this.props.categories[0]})
  }

  componentWillReceiveProps(nextProps) {
    console.log("RECEIVED PROPS");
    console.log(nextProps);
    this.setState({recipeCategory: nextProps.categories[0].id})
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        {this.createInput('Title', 'recipeTitle', 'text', 'Recipe title..')}
        {this.createInput('Description', 'recipeDescription', 'text', 'Recipe description..')}
        <label htmlFor='recipeCategory'>Category</label>
        <select name='recipeCategory' value={this.state.recipeCategory} onChange={this.handleChange} >
          {this.props.categories.map(category => (
            <option key={category.id} value={category.id} name='category'>{category.name}</option>
          ))}
        </select>
        {this.createInput('Ingredient', 'recipeIngredient', 'text', 'Add ingredient...')}
        <input type='submit' value='Submit' />
        {this.statusMessage(this.props.postRecipeStatus)}
      </form>
    )
  }
}

const AddRecipe = connect(mapStateToProps, mapDispatchToProps)(AddRecipeComponent);

export default AddRecipe;