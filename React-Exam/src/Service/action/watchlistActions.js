export const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST";
export const REMOVE_FROM_WATCHLIST = "REMOVE_FROM_WATCHLIST";
export const INCREASE_PRIORITY = "INCREASE_PRIORITY";
export const DECREASE_PRIORITY = "DECREASE_PRIORITY";
export const CLEAR_WATCHLIST = "CLEAR_WATCHLIST";

export const addToWatchlist = (movie) => ({
    type: ADD_TO_WATCHLIST,
    payload: movie,
});

export const removeFromWatchlist = (movieId) => ({
    type: REMOVE_FROM_WATCHLIST,
    payload: movieId,
});

export const increasePriority = (movieId) => ({
    type: INCREASE_PRIORITY,
    payload: movieId,
});

export const decreasePriority = (movieId) => ({
    type: DECREASE_PRIORITY,
    payload: movieId,
});

export const clearWatchlist = () => ({
    type: CLEAR_WATCHLIST,
});
