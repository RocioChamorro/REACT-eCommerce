import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewProduct, updateProduct } from "./productsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { saveNewProduct } from "../../helpers/saveNewProduct";
import { saveEditProduct } from "../../helpers/saveEditProduct";


//startGettingProducts: RTK Query

export const startNewProduct = (newProduct, onClose) => {
    return async( dispatch, getState ) => {
        //const { uid } = getState().auth;
        // const newDoc = doc( collection( FirebaseDB, 'products'));
        // await setDoc( newDoc, newProduct );

        //newProduct.id = newDoc.id;
        try {
          const result = await saveNewProduct(newProduct);
          newProduct.id = nanoid();
          toast.success("Nuevo producto agregado", { position: "bottom-right", });
          onClose();
          dispatch(addNewProduct(newProduct));

        } catch (error) {
          console.log(error);
        }
    }
}

export const startSavingEditProduct = (onClose) => {
  return async (dispatch, getState) => {
    const { currentProduct:product } = getState.products;
    const data = {...product};
    delete data.id
    try {
      const result = await saveEditProduct(data, product.id);
      toast.success("Los cambios se guardaron con éxito", { position: "bottom-right" });
      dispatch(updateProduct(product));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
};

