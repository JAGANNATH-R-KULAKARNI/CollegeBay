import changeCartLen from "./CartUpDown";
import updateCart from "./TotalCart";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeCartLen,
  updateCart,
});

export default rootReducer;
