import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getProducts } from "../../helpers/getProducts";

const initialState = {
  products: [],
  categories: [],
  status: null,
  currentProduct: null,
  isNewProduct: false,
  isEditProduct: false,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const products = await getProducts();
      return products;
    } catch (error) {
      return [];
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    setProducts(state, action) {
      state.products = action.payload;
    },
    addAnAmount(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      let product = state.products[itemIndex];
      if (product.quantity > product.tempQuantity) product.tempQuantity += 1;
      else toast.info("Solo puede agregar la cantidad disponible del producto", {position: "bottom-left"});
    },
    subtractAnAmount(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      let product = state.products[itemIndex];
      if (product.tempQuantity > 1) product.tempQuantity -= 1;
    },
    updateProductAvailability(state, action) {
      action.payload.forEach(cartProduct => {
        const itemIndex = state.products.findIndex(
          (item) => item.id === cartProduct.id
        );
        state.products[itemIndex].quantity -= cartProduct.cartQuantity;
      });
    },
    addNewProduct(state, action) {
      state.products.push(action.payload);
    },
    setCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
    resetCurrentProduct(state) {
      state.isNewProduct= false;
      state.isEditProduct= false;
      state.currentProduct = {
        id: 0,
        category: '',
        title:'',
        description: '',
        price: '',
      };
    },
    updateProduct(state, action) {
      state.products = state.products.map( product => {
        if ( product.id === action.payload.id ) {
          return action.payload;
        }
        return product;
      })
    },
    setIsNewProduct(state, action) {
      state.isNewProduct = action.payload;
    },
    setIsEditProduct(state, action) {
      state.isEditProduct = action.payload;
    },
    deleteProduct(state, action) {
      state.products = state.products.filter( product => product.id !== action.payload);
    },
    setAllCategories(state, action) {
      state.categories = action.payload;
    }
  },
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { setProducts, addAnAmount, subtractAnAmount, updateProductAvailability, addNewProduct, setCurrentProduct, resetCurrentProduct, updateProduct, setIsNewProduct, setIsEditProduct, deleteProduct, setAllCategories } = productsSlice.actions;
export default productsSlice.reducer;
