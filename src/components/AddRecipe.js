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
      recipeIngredients: [
        {
          name: '',
        },
      ],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.statusMessage = this.statusMessage.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      title: this.state.recipeTitle,
      description: this.state.recipeDescription,
      category: this.state.recipeCategory,
      ingredients_write: this.state.recipeIngredients.filter(x => x.name !== '').map(x => x.name),
    }
    console.log(params);
    this.props.postRecipe(params, this.props.auth.token);
    this.clearForm();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  selectCheckbox = event => {
    this.props.changeCheckbox(event.target.id);
  }

  clearForm() {
    this.setState({
      recipeTitle: '',
      recipeDescription: '',
      recipeCategory: '',
      recipeIngredients: [
        {
          name: '',
        },
      ],
    })
  }

  createInput = (label, name, type, placeholder) => {
    return(
      <div className='field'>
        <label className="label" htmlFor={name}>{label}</label>
        <div className='control'>
          <input
            minLength='1'
            maxLength='128'
            name={name}
            id={name}
            type={type}
            value={this.state[name]}
            onChange={this.handleChange}
            placeholder={placeholder}
            className="input"
          />
        </div>
      </div>
    )
  }

  statusMessage = ({isPosting, posted, errors}) => {
    if(isPosting) {
      return <p className='help'>Posting your recipe</p>
    } else if (posted) {
      return <p className='help is-success'>Succesfully posted your recipe</p>
    } else if (errors) {
      return (
        <p className='help is-danger'>Error sending form</p>
      )
    } else {
      return ''
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.setState({recipeCategory: this.props.categories[0]})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({recipeCategory: nextProps.categories[0].id})
  }

  handleIngredientNameChange = idx => evt => {
    const newRecipeIngredients = this.state.recipeIngredients.map((recipe, sidx) => {
      if (idx !== sidx) return recipe;
      return { ...recipe, name: evt.target.value };
    });

    this.setState({ recipeIngredients: newRecipeIngredients });
  };

  handleAddRecipe = () => {
    this.setState({
      recipeIngredients: this.state.recipeIngredients.concat([{ name: "" }])
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      recipeIngredients: this.state.recipeIngredients.filter((s, sidx) => idx !== sidx)
    });
  };


  render() {
    return(
      <form className="container" onSubmit={this.handleSubmit}>
        {this.createInput('Title', 'recipeTitle', 'text', 'Recipe title..')}
        {this.createInput('Description', 'recipeDescription', 'text', 'Recipe description..')}
        <div className='field'>
          <label className='label' htmlFor='recipeCategory'>Category</label>
          <div className='control'>
            <div className='select'>
              <select name='recipeCategory' value={this.state.recipeCategory} onChange={this.handleChange} >
                {this.props.categories.map(category => (
                  <option key={category.id} value={category.id} name='category'>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field" >
          <label className='label' >Ingredients</label>
          <button
            type="button"
            onClick={this.handleAddRecipe}
            className="button is-info"
          >
            Add another ingredient
          </button>
        </div>
          {this.state.recipeIngredients.map((ingredient, idx) => (
            <div className='field has-addons' key={idx}>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  value={ingredient.name}
                  onChange={this.handleIngredientNameChange(idx)}
                />
              </div>
              <div className='control'>
                <button
                  type="button"
                  onClick={this.handleRemoveIngredient(idx)}
                  className="button is-info"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        <div className='field'>
          <div className='control'>
            <input className='button is-primary' type='submit' value='Submit' />
          </div>
          {this.statusMessage(this.props.postRecipeStatus)}
        </div>
      </form>
    )
  }
}

const AddRecipe = connect(mapStateToProps, mapDispatchToProps)(AddRecipeComponent);

export default AddRecipe;