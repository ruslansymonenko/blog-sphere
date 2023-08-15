import { configureStore } from '@reduxjs/toolkit';

import allPostSlice from './slices/allPostSlice';

export default configureStore({
  reducer: {
    allPosts: allPostSlice,
  }
});