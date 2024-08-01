import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { signIn, signUp } from '@services/api';

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: localStorage.getItem('token'),
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const token = await signIn(credentials);
    localStorage.setItem('token', token);
    return token;
  }
);

export const register = createAsyncThunk(
  'auth/signup',
  async (credentials: { username: string; password: string }) => {
    const token = await signUp(credentials);
    localStorage.setItem('token', token);
    return token;
  }
);

const isRejectedAction = (action: any) => {
  return action.type.endsWith('rejected');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to signup';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
