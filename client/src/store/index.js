import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import postSlice from './slices/postSlice';
import commentSlice from './slices/commentSlice';
import socketSlice from './slices/socketSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
    socket: socketSlice,
  }
});