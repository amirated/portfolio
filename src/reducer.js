import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  common,
  editor,
  home,
  profile,
  router: routerReducer
});
