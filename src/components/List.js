import React, { Component } from "react";
import { connect } from "react-redux";
import { getRecipes, getMoreRecipes } from '../actions/index'
import SearchFormComponent from './SearchForm';

const mapStateToProps = state => {
  return {
    loading: state.loading,
    next: state.next,
    previous: state.previous,
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipes() {
      dispatch(getRecipes());
    },
    loadMore(url) {
      dispatch(getMoreRecipes(url));
    }
  }
}

class ConnectedList extends Component {

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    return (
      <div className="container">
        <SearchFormComponent />
        <ul className="content">
          {this.props.recipes.length ? this.props.recipes.map(recipe => (
            <li key={recipe.id}>
              {recipe.title}
            </li>
          )) : <p>Found no recipes</p>}
        </ul>
        {this.props.loading && <p>Loading</p>}
        {(this.props.next && !this.props.loading) && <button onClick={() => this.props.loadMore(this.props.next)} >Load More</button>}
      </div>
    );
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;