import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: true, // true initially while checking async storage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    signIn: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { restoreToken, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
