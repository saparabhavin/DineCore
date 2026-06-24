import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { setInventory, updateQuantity } = inventorySlice.actions;
export default inventorySlice.reducer;
