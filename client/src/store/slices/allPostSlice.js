import { createSlice } from '@reduxjs/toolkit';

export const allPostsSlice = createSlice({
  name: 'allPosts',
  initialState: {
    posts: [],
  }
});


export default allPostsSlice.reducer;

