import { combineReducers } from "redux";
import watchlistReducer from "./watchlistReducer";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";

export const rootReducer = combineReducers({
  watchlistReducer,
  authReducer,
  movieReducer,
});
