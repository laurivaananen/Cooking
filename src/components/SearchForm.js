import React, { Component } from "react";
import { connect } from "react-redux";
import { getRecipes, getMoreRecipes, getCategories, changeCheckbox } from '../actions/index'

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipes(params) {
      dispatch(getRecipes(params));
    },
    fetchCategories() {
      dispatch(getCategories());
    },
    loadMore(url) {
      dispatch(getMoreRecipes(url));
    },
    changeCheckbox(id) {
      dispatch(changeCheckbox(id));
    }
  }
}

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.selectCheckbox = this.selectCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      categories: this.props.categories.filter(x => x.isSelected).map(x => x.id)
    }
    this.props.fetchRecipes(params);
  }

  selectCheckbox = event => {
    this.props.changeCheckbox(event.target.id);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="container">
        <form className="field is-grouped" onSubmit={this.handleSubmit} >
          {this.props.categories.map(category => (
            <div className="control" key={category.id} >
              <input type="checkbox" checked={category.isSelected} onChange={this.selectCheckbox} name="category[]" value={category.name} id={category.id} />
              <label className="checkbox" htmlFor={category.id}>{category.name}</label>
            </div>
          ))}
          
          <button className="button is-primary" type="submit">Search</button>
        </form>
      </div>
    );
  }
}

const SearchFormComponent = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchFormComponent;