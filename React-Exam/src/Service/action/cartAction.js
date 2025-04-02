import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

const cartRef = collection(db, "cart");

export const fetchCartFromFirebase = (userId) => async (dispatch) => {
  try {
    const q = query(cartRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const cartItems = [];
    querySnapshot.forEach((doc) => {
      cartItems.push({ id: doc.id, ...doc.data() });
    });

    dispatch({
      type: "FETCH_CART",
      payload: cartItems,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

export const addToCart = (product) => async (dispatch, getState) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated!");
    return;
  }

  const cartItems = getState().cartReducer.cartItems;
  const existingItem = cartItems.find((item) => item.id === `${user.uid}_${product.id}`);

  if (existingItem) {
    dispatch(increaseQuantity(existingItem.id));
  } else {
    const newCartItem = { ...product, quantity: 1, userId: user.uid };
    const docRef = doc(cartRef, `${user.uid}_${product.id}`);
    try {
      await setDoc(docRef, newCartItem);
      dispatch({
        type: "ADD_TO_CART",
        payload: { id: `${user.uid}_${product.id}`, ...newCartItem },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) return;

  const itemRef = doc(db, "cart", id);
  await deleteDoc(itemRef);

  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
};

export const increaseQuantity = (id) => async (dispatch, getState) => {
  const user = auth.currentUser;
  if (!user) return;

  const correctId = `${user.uid}_${id}`;
  const itemRef = doc(db, "cart", correctId);
  const itemSnap = await getDoc(itemRef);
  
  if (itemSnap.exists()) {
    await updateDoc(itemRef, { quantity: itemSnap.data().quantity + 1 });
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  }
};

export const decreaseQuantity = (id) => async (dispatch, getState) => {
  const user = auth.currentUser;
  if (!user) return;

  const correctId = `${user.uid}_${id}`;
  const itemRef = doc(db, "cart", correctId);
  const itemSnap = await getDoc(itemRef);

  if (itemSnap.exists()) {
    const currentQuantity = itemSnap.data().quantity;
    if (currentQuantity > 1) {
      await updateDoc(itemRef, { quantity: currentQuantity - 1 });
      dispatch({ type: "DECREASE_QUANTITY", payload: id });
    } else {
      await deleteDoc(itemRef);
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    }
  }
};

export const clearCart = (userId) => async (dispatch) => {
  const q = query(cartRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => await deleteDoc(doc.ref));
  dispatch({ type: "CLEAR_CART" });
};

const orderRef = collection(db, "orders");

export const placeOrder = (cartItems, totalAmount, setOrderSuccess) => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated!");
      setOrderSuccess(false);
      return;
    }

    const orderData = {
      userId: user.uid,
      items: cartItems,
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    await addDoc(orderRef, orderData);
    dispatch(clearCart(user.uid));
    setOrderSuccess(true);
  } catch (error) {
    console.error("Error placing order:", error);
    setOrderSuccess(false);
  }
};
