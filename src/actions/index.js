import {
  FETCH_RECIPES_FAILED,
  FETCH_RECIPES_STARTED,
  FETCH_RECIPES_SUCCEEDED,
  FETCH_MORE_RECIPES_STARTED,
  FETCH_MORE_RECIPES_SUCCEEDED,
  FETCH_CATEGORIES_SUCCEEDED,
  CHECKBOX_CHANGED,
  LOGIN_FAILED,
  LOGIN_STARTED,
  LOGIN_SUCCEEDED,
} from './types';

import axios from 'axios';
import React from 'react';
import { Route, Redirect } from 'react-router'
import history from '../history';

export const login = (params={}) => {
  const {username, password, redirectTo} = params;
  console.log(redirectTo);
  return dispatch => {
    dispatch(loginStarted());
    axios.post('http://www.laurivaananen.com:8002/login/', {username, password})
      .then(res => {
        dispatch(loginSucceeded(res.data));
        return dispatch => redirect(redirectTo);
      })
      .catch(err => {
        dispatch(loginFailed(err));
      });
  };
};

const redirect = url => {
  history.push(url);
}

const loginStarted = () => {
  return({
    type: LOGIN_STARTED,
  })
}

const loginSucceeded = data => {
  localStorage.setItem('token', data.token);
  return({
    type: LOGIN_SUCCEEDED,
    payload: {
      auth: data,
    }
  })
}

const loginFailed = data => {
  console.log("LOGINFAILES");
  console.log(data);
  return({
    type: LOGIN_FAILED,
    payload: {
      errors: data.response.data.non_field_errors,
    }
  })
}
 
export const getRecipes = (params={}) => {
  return dispatch => {
    dispatch(getRecipesStarted());

    axios.get('http://www.laurivaananen.com:8002/recipes/', {params: params})
      .then(res => {
        dispatch(getRecipesSuccess(res.data));
      })
      .catch(err => {
        dispatch(getRecipesFailed(err.message));
      });
  };
};

export const getCategories = () => {
  return dispatch => {
    fetch('http://www.laurivaananen.com:8002/categories/')
      .then(res => res.json())
      .then(res => {
        dispatch(getCategoriesSucceeded(res));
      })
  }
}

export const getMoreRecipes = url => {
  return dispatch => {
    dispatch(getMoreRecipesStarted());

    fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch(getMoreRecipesSucceeded(res));
      })
      .catch(err => {
        dispatch(getRecipesFailed(err.message));
      })
  }
}

export const changeCheckbox = id => {
  return({
    type: CHECKBOX_CHANGED,
    payload: {
      id: id
    }
  });
}

const getCategoriesSucceeded = data => {
  return({
    type: FETCH_CATEGORIES_SUCCEEDED,
    payload: {
      categories: data
    }
  });
}

const getMoreRecipesSucceeded = data => {
  return({
    type: FETCH_MORE_RECIPES_SUCCEEDED,
    payload: {
      next: data.next,
      previous: data.previous,
      results: [...data.results]
    }
  })
}

const getMoreRecipesStarted = () => {
  return({
    type: FETCH_MORE_RECIPES_STARTED
  })
}

const getRecipesSuccess = data => {
  return({
  type: FETCH_RECIPES_SUCCEEDED,
  payload: {
    next: data.next,
    previous: data.previous,
    results: [...data.results]
  }
})};

const getRecipesStarted = () => {
  return({
  type: FETCH_RECIPES_STARTED
})};

const getRecipesFailed = error => {
  return({
    type: FETCH_RECIPES_FAILED,
    payload: { error }
  })};