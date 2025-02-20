import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../../store";

// Define the type for a cart item
interface CartItem {
  _id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  imageUrl: string;
  count: number; // Number of items added to cart
}

// Define the state type
interface CartState {
  items: CartItem[];
}

// Initial state
const initialState: CartState = {
  items: [],
};

// Create a slice for cart management
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      } else {
        state.items = state.items.filter((item) => item._id !== action.payload);
      }
    },
  },
});

// Redux Persist Configuration
const persistConfig = {
  key: "cart",
  storage,
};

// Export persisted reducer
export const persistedCartReducer = persistReducer(
  persistConfig,
  cartSlice.reducer
);

// Export actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

// Export selector
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
