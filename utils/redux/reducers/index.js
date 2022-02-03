import changeCartLen from "./CartUpDown";
import updateCart from "./TotalCart";
import SearchText from "./SearchBar";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeCartLen,
  updateCart,
  SearchText,
});

export default rootReducer;
