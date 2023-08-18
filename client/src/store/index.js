import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import getPostsSlice from './slices/getPostSlice';
import postSlice from './slices/postSlice';
import socketSlice from './slices/socketSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    getPosts: getPostsSlice,
    post: postSlice,
    socket: socketSlice,
  }
});