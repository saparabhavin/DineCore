import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';
import staffReducer from './staffSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    staff: staffReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
