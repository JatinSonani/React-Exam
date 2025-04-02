const initialState = {
    products: [],
    product: {},
    isCreated: false,
    isLoading: false,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "Get_All_Product":
        return {
          ...state,
          products: action.payload,
          isCreated: false, 
        };
  
      case "Add_Product":
        return {
          ...state,
          isCreated: true, 
        };
  
      
      case "Update_Product":
      return {
        ...state,
        isUpdated: true, 
      };
  
      

      case "RESET_UPDATE":
      return {
        ...state,
        isUpdated: false, 
      };

        case "Get_Product":
          return {
            ...state,
            product: action.payload, 
          };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  


