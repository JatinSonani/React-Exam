const initialState = {
    watchlist: [],
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_WATCHLIST":
        // Prevent duplicates
        if (state.watchlist.some((movie) => movie.id === action.payload.id)) {
          return state;
        }
        return {
          ...state,
          watchlist: [...state.watchlist, { ...action.payload, priority: 1 }],
        };
  
      case "REMOVE_FROM_WATCHLIST":
        return {
          ...state,
          watchlist: state.watchlist.filter((movie) => movie.id !== action.payload),
        };
  
      case "INCREASE_PRIORITY":
        return {
          ...state,
          watchlist: state.watchlist.map((movie) =>
            movie.id === action.payload
              ? { ...movie, priority: movie.priority + 1 }
              : movie
          ),
        };
  
      case "DECREASE_PRIORITY":
        return {
          ...state,
          watchlist: state.watchlist.map((movie) =>
            movie.id === action.payload && movie.priority > 1
              ? { ...movie, priority: movie.priority - 1 }
              : movie
          ),
        };
  
      case "CLEAR_WATCHLIST":
        return {
          ...state,
          watchlist: [],
        };
  
      default:
        return state;
    }
  };
  
  export default watchlistReducer;
  