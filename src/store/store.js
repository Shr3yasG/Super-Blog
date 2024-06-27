import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure the reducer is correctly imported
  },
});

export default store;
