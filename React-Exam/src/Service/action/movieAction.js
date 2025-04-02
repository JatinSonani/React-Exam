import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const movieRef = collection(db, "movies");

export const getAllMoviesAsync = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(movieRef);
    const movies = [];
    querySnapshot.forEach((doc) => {
      movies.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: "FETCH_ALL_MOVIES", payload: movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const getMovieAsync = (id) => async (dispatch) => {
  try {
    const movieDoc = await getDoc(doc(db, "movies", id));
    if (movieDoc.exists()) {
      dispatch({ type: "FETCH_MOVIE", payload: { id: movieDoc.id, ...movieDoc.data() } });
    } else {
      console.error("Movie not found");
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
};

export const AddMovieAsync = (movieData) => async (dispatch) => {
  try {
    const docRef = await addDoc(movieRef, movieData);
    dispatch({ type: "ADD_MOVIE", payload: { id: docRef.id, ...movieData } });
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};

export const updateMovieAsync = (id, updatedData) => async (dispatch) => {
  try {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, updatedData);
    dispatch({ type: "UPDATE_MOVIE", payload: { id, ...updatedData } });
  } catch (error) {
    console.error("Error updating movie:", error);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "movies", id));
    dispatch({ type: "DELETE_MOVIE", payload: id });
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
};
