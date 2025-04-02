import { combineReducers } from "redux";
import productReducer from "./productReducer";
import { userReducer } from "./userReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({ 
    productReducer,
    userReducer,
    cartReducer
})