import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.data.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += action.payload.tempQuantity;
        toast.info(
          `Se agregaron ${action.payload.tempQuantity} ud. del producto`,
          { position: "bottom-left" }
        );
      } else {
        const tempProduct = {
          ...action.payload.data,
          cartQuantity: action.payload.tempQuantity,
        };

        state.cartItems.push(tempProduct);
        toast.success("Producto agregado al carrito", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeProductFromCart(state, action) {
      const _cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = _cartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.title} eliminado del carrito`, {
        position: "bottom-left",
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error("Carrito de compras limpio", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    totalCartSum(state) {
      let { quantity, total } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCard, removeProductFromCart, clearCart, totalCartSum } = cartSlice.actions;
export default cartSlice.reducer;
