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
} from '../actions/types';

const initialState = {
  loading: false,
  next: null,
  previous: null,
  recipes: [],
  error: null,
  categories: [],
  auth: {isAuthenticated: false},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        auth: Object.assign({}, state.auth, {isAuthenticated: false}),
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        auth: Object.assign({}, action.payload.auth, {isAuthenticated: true}),
      };
    case LOGIN_FAILED:
      return {
        ...state,
        auth: Object.assign({}, state.auth, {errors: action.payload.errors}, {isAuthenticated: false}),
      }
    case FETCH_RECIPES_STARTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_RECIPES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        next: action.payload.next,
        previous: action.payload.previous,
        recipes: [...action.payload.results]
      };
    case FETCH_RECIPES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_MORE_RECIPES_STARTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_MORE_RECIPES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        next: action.payload.next,
        previous: action.payload.previous,
        recipes: [...state.recipes, ...action.payload.results]
      }
    case FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        categories: [...action.payload.categories.map(x => Object.assign({}, x, {isSelected: false}))]
      }
    case CHECKBOX_CHANGED:

      const reducer = action => (all, one, ) => {
        if(one.id == action.payload.id) {
          return(all.concat(Object.assign({}, one, {isSelected: !one.isSelected})))
        }
        return(all.concat(one));
      }

      const checkboxReducer = reducer(action);

      return {
        ...state,
        categories: state.categories.reduce(checkboxReducer, [])

      }
    default:
      return state;
  }
}