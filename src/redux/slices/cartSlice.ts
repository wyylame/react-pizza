import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "./pizzaSlice";

export interface CartPizza extends Pizza{
  price: number,
  currentType: number,
  currentSize: number
  count?: number
}

interface cartState {
  items: CartPizza[];
  totalCount: number;
  totalPrice: number;
}

const initialState: cartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

function findItemIndex(items: CartPizza[], item: CartPizza) {
  return items.findIndex(
    (e) =>
      e.id === item.id &&
      e.currentType === item.currentType &&
      e.currentSize === item.currentSize
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartPizza>) => {
      let item: CartPizza = action.payload;
      const index = findItemIndex(state.items, item);
      if (index !== -1) {
        state.items[index].count += 1;
      } else {
        state.items.push({ ...item, count: 1 });
      }
      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    removeItemFromCart: (state, action: PayloadAction<CartPizza>) => {
      const index = findItemIndex(state.items, action.payload);
      state.items = [
        ...state.items.slice(0, index),
        ...state.items.slice(index + 1),
      ];
      state.totalCount -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
    },
    decreaseItemsCount: (state, action: PayloadAction<CartPizza>) => {
      const index = findItemIndex(state.items, action.payload);
      const count = state.items[index].count;
      state.items[index].count -= count > 1 ? 1 : 0;
      state.totalCount -= count > 1 ? 1 : 0;
      state.totalPrice -= count > 1 ? action.payload.price : 0;
    },
    increaseItemsCount: (state, action: PayloadAction<CartPizza>) => {
      const index = findItemIndex(state.items, action.payload);
      const count = state.items[index].count;
      state.items[index].count += count < 10 ? 1 : 0;
      state.totalCount += count < 10 ? 1 : 0;
      state.totalPrice += count < 10 ? action.payload.price : 0;
    },
  },
});

export const {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  decreaseItemsCount,
  increaseItemsCount,
} = cartSlice.actions;
export default cartSlice.reducer;