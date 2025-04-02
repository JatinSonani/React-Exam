
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./Service/reducer/rootReducer"; 
import {thunk} from "redux-thunk"; // Fixed import issue

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
