import {
    SIGNUP_SUCCESS,
    SIGNUP_REJECT,
    SIGNIN_SUCCESS,
    SIGNIN_REJECT,
    LOGOUT,
    LOADING,
} from "../action/authAction";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true, error: null };

        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case SIGNUP_REJECT:
        case SIGNIN_REJECT:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT:
            return { ...state, user: null, loading: false, error: null };

        default:
            return state;
    }
};

export default authReducer;
