

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

export const addProduct = () => ({
    type: "Add_Product"
});
export const getProduct = (data) => ({ 
    type: "Get_Product", 
    payload: data 
});
export const updateProduct = () => ({ 
    type: "Update_Product" 
});
export const getAllProducts = (data) => ({ 
    type: "Get_All_Product",
     payload: data 
    });


export const getAllProductsAsync = () => {
    return async(dispatch) => {
        const querySnapshot = await getDocs(collection(db, "products"));
        let result = [];
        querySnapshot.forEach((doc) => {
         console.log(doc.id, " => ", doc.data());
         result.push({...doc.data(),id : doc.id})
          });
          dispatch(getAllProducts(result))
    };
};

export const AddProductAsync = (data) => {
    return async (dispatch) => {
      try {
        const docRef = await addDoc(collection(db, "products"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: "Add_Product" }); 
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
  };
  

export const deleteProductAsync = (id) => {
    return async(dispatch) => {
      try {
         await deleteDoc(doc(db, "products", id));
          dispatch(getAllProductsAsync());
      } catch (error) {
          console.error("Error : ", error);
      }
    };
  };

export const getProductAsync = (id) => {
    return async(dispatch) => {
        try {
            let getRecord = await getDoc(doc(db, "products", id));
            console.log("Get Record: => ", getRecord);
            if(getRecord){
                dispatch(getProduct({...getRecord.data(), id: getRecord.id}));
            }
        } catch (error) {
            console.error("Error : ", error);
        }
    };
};

export const updateProductAsync = (id, data) => {
    return async (dispatch) => {
      try {
        await updateDoc(doc(db, "products", id), data); 
        dispatch({ type: "Update_Product" }); 
        dispatch(getAllProductsAsync()); 
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
  };
  