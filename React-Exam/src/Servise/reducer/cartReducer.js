const initialState = {
    cartItems: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_CART":
        return {
          ...state,
          cartItems: action.payload,
        };
  
      case "ADD_TO_CART":
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
  
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };
  
      case "INCREASE_QUANTITY":
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
  
      case "DECREASE_QUANTITY":
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
  
      case "CLEAR_CART":
        return {
          ...state,
          cartItems: [],
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  