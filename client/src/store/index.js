import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import allPostSlice from './slices/allPostSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    allPosts: allPostSlice,
  }
});