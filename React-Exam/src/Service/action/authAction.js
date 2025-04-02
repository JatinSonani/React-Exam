import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_REJECT = "SIGNUP_REJECT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_REJECT = "SIGNIN_REJECT";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";

export const loginSuc = (user) => ({
    type: SIGNIN_SUCCESS,
    payload: user,
});

export const registerUserAsync = (email, password) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({ type: SIGNUP_SUCCESS, payload: userCredential.user });
    } catch (error) {
        dispatch({ type: SIGNUP_REJECT, payload: error.message });
    }
};

export const loginUserAsync = (email, password) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: SIGNIN_SUCCESS, payload: userCredential.user });
    } catch (error) {
        dispatch({ type: SIGNIN_REJECT, payload: error.message });
    }
};

export const logOutAsync = () => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        await signOut(auth);
        dispatch({ type: LOGOUT });
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const authStateListener = () => (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(loginSuc({ displayName: user.displayName, email: user.email, id: user.uid }));
        } else {
            dispatch({ type: LOGOUT });
        }
    });
};
