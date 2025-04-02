import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import watchlistReducer from "./watchlistReducer";

const rootReducer = combineReducers({
    authReducer,       // Authentication state
    movieReducer,      // Movie data
    watchlistReducer,  // Watchlist state
});

export default rootReducer;
