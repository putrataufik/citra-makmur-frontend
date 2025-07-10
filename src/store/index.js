// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const savedToken = localStorage.getItem('token');

const initialState = {
  auth: {
    token: savedToken,
    isAuthenticated: !!savedToken,
    user: null,
    loading: false,
    error: null,
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState,
});

