import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewProduct, deleteProduct, setAllCategories, setProducts, updateProduct } from "./productsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { saveNewProduct } from "../../helpers/saveNewProduct";
import { saveEditProduct } from "../../helpers/saveEditProduct";
import { deleteProductById } from "../../helpers/deleteProductById";
import { getAllCategories, getProductsByCategory } from "../../helpers/categoryRequests.js";
import { getProducts } from "../../helpers/getProducts";
import { getProductById } from "../../helpers/productRequest";


//startGettingProducts: RTK Query
export const startGetProductById = (id) => {
  return async (dispatch) => {
    try {
      const result = await getProductById(id);
      dispatch(setProducts(id));

    } catch (error) {
      console.log(error);
    }
  };
};

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

export const startSavingEditProduct = (product, onClose) => {
  return async (dispatch, getState) => {
    // const { currentProduct:product } = getState.products;
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

export const startDeletingProduct = (id) => {
  return async (dispatch) => {
    try {
      const result = await deleteProductById(id);
      toast.success("El producto se elminó con éxito", { position: "bottom-right" });
      dispatch(deleteProduct(id));

    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetAllCategories = () => {
  return async (dispatch) => {
    try {
      const result = await getAllCategories();
      dispatch(setAllCategories(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSetProductByCategory = (category) => {
  return async(dispatch, getState) => {
    let result = [];
    try {
      if (category === "products") {
        result = await getProducts();
      } else {
        result = await getProductsByCategory(category);
      }
      dispatch(setProducts(result));

    } catch (error) {
      console.log(error);
    }
  };
};

