import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard(state, action) {
      
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        let tempTotalQuantity =
          state.cartItems[itemIndex].cartQuantity + action.payload.tempQuantity;

        if (state.cartItems[itemIndex].quantity >= tempTotalQuantity)
          state.cartItems[itemIndex].cartQuantity +=
            action.payload.tempQuantity;
        else
          toast.info("Solo puede agregar la cantidad disponible del producto", {position: "bottom-left"});
      } else {
        if (action.payload.quantity > 0) {
          const tempProduct = {
            ...action.payload,
            cartQuantity: action.payload.tempQuantity,
          };

          state.cartItems.push(tempProduct);
        } else
          toast.info("Solo puede agregar la cantidad disponible del producto", {position: "bottom-left"});
      }
    },
    removeProductFromCart(state, action) {
      const _cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      state.cartItems = _cartItems;
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
    totalCartSum(state) {
      let total = state.cartItems.reduce((total, cartItem) => {
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;

        total += itemTotal;
        return total;
      }, 0);
      state.cartTotalAmount = total;
    }
  },
});

export const { addToCard, removeProductFromCart, clearCart, totalCartSum } = cartSlice.actions;
export default cartSlice.reducer;
