const initialState = {
    user: null,
    isCreated: false,
    error: null,
    isLoading: true, 
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SIGNUP_SUCCESS":
        return {
          ...state,
          isCreated: true,
        };
      case "SIGNUP_REJECT":
        return {
          ...state,
          error: action.payload,
        };
      case "SIGNIN_SUCCESS":
        return {
          ...state,
          user: action.payload,
          isLoading: false, 
        };
      case "SIGNIN_REJECT":
        return {
          ...state,
          error: action.payload,
          isLoading: false, 
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
          isLoading: false,
        };
      case "Loading":
        return {
          ...state,
          isLoading: true,
        };
      default:
        return state;
    }
  };
  