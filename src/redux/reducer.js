import {combineReducers} from 'redux';
import userReducer from './User/reducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
});

export default rootReducer;
