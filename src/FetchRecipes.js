import { connect } from 'react-redux';
import { getRecipes } from '../actions';
import GetRecipes from '../components/GetRecipes';

const mapDispatchToProps = dispatch => {
  return {
    onGetRecipes()  {
      dispatch(getRecipes(toto));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GetRecipes);