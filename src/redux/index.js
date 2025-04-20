import { combineReducers } from "redux";

import profileSlice from './slices/profileSlice';
import cartSlice from './slices/cartSlice';

const rootReducer = combineReducers({
  profile: profileSlice,
  cart:cartSlice
});
export default rootReducer;