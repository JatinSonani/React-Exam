const initialState = {
    movies: [],
    isLoading: false,
    error: null,
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_MOVIES_REQUEST":
        return {
          ...state,
          isLoading: true,
          error: null,
        };
  
      case "FETCH_MOVIES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          movies: action.payload,
        };
  
      case "FETCH_MOVIES_FAILURE":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default movieReducer;
  