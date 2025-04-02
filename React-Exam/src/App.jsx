
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import { Route, Routes } from "react-router";
import Footer from "./Components/Footer";
import ViewProduct from "./Components/ViewProducts";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuc } from "./Servise/action/auth.action";
import Categories from "./Components/Categories";
import { auth } from "./FirebaseConfig";
import { fetchCartFromFirebase } from "./Servise/action/cart.action";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginSuc({
            displayname: user.displayName,
            email: user.email,
            id: user.uid,
          })
        );
        dispatch(fetchCartFromFirebase(user.uid)); 
      }else{
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
      <Categories />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/view/:id" element={<ViewProduct />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
