import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  
// }
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeProduct(state, action) { 
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrementQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
    }
    
  }
})

export const { addProduct, removeProduct, incrementQuantity, decrementQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;