import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import postSlice from './slices/postSlice';
import socketSlice from './slices/socketSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    socket: socketSlice,
  }
});