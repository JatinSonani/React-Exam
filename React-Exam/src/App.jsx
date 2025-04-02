import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./Components/Home";
import Header from "./Components/Header";
import AddMovie from "./Components/AddMovie";
import EditMovie from "./Components/EditMovie";
import MovieFooter from "./Components/MovieFooter";
import ViewProducts from "./Components/ViewProducts";
import Movie from "./Components/Movie";
import Watchlist from "./Components/Watchlist";
import MovieGenres from "./Components/MovieGenres";

import { auth } from "./FirebaseConfig";
import { loginSuc } from "./Service/action/authAction";
import { fetchCartFromFirebase } from "./Service/action/cartAction";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginSuc({
            displayName: user.displayName,
            email: user.email,
            id: user.uid,
          })
        );
        dispatch(fetchCartFromFirebase(user.uid));
      } else {
        dispatch({ type: "FETCH_CART", payload: [] });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Checking Authentication...</h3>
      </div>
    );
  }

  return (
    <>
      <Header />
      <MovieGenres />
      <Routes>
        <Route path="/signup" element={<Movie type="register" />} />
        <Route path="/signin" element={<Movie type="login" />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Watchlist />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
        <Route path="/view/:id" element={<ViewProducts />} />
      </Routes>
      <MovieFooter />
    </>
  );
}

export default App;
