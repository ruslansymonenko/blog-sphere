import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import allPostSlice from './slices/allPostSlice';
import postSlice from './slices/postSlice';
import socketSlice from './slices/socketSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    allPosts: allPostSlice,
    post: postSlice,
    socket: socketSlice,
  }
});