import { createSlice } from '@reduxjs/toolkit';
import { login } from '../thunks/auth';

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        localStorage.setItem('@ACCESS_TOKEN', action.payload.access_token);
      })
      .addCase(login.rejected, (state) => {
        state.authenticated = true;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
