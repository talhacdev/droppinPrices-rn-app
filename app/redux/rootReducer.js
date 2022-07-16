import {combineReducers} from 'redux';
import authReducers from './reducers/authReducers';

const rootReducer = combineReducers({
  auth: authReducers,
});
export default rootReducer;
