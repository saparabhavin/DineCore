import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Platform } from 'react-native';

// For Android emulator to hit host's localhost, we use 10.0.2.2.
// iOS simulator can just use localhost.
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  isAvailable: boolean;
  image?: string;
  category?: MenuCategory; // Included from TypeORM relations
}

export interface MenuCategory {
  id: string;
  name: string;
}

interface MenuState {
  categories: MenuCategory[];
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  categories: [],
  items: [],
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await axios.get(`${API_URL}/menu`);
  return response.data; // { categories, items }
});

export const toggleAvailabilityAPI = createAsyncThunk(
  'menu/toggleAvailabilityAPI',
  async (id: string, { dispatch }) => {
    await axios.put(`${API_URL}/menu/items/${id}/availability`);
    dispatch(fetchMenu()); // Re-fetch to ensure sync, or just toggle locally
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Local optimistic toggle
    toggleItemAvailabilityLocal: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.isAvailable = !item.isAvailable;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.items = action.payload.items;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menu';
      });
  },
});

export const { toggleItemAvailabilityLocal } = menuSlice.actions;
export default menuSlice.reducer;
