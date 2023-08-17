import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  try{
    const response = await axios.get('http://localhost:8000/posts/getAllPosts');
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const allPostsSlice = createSlice({
  name: 'allPosts',
  initialState: {
    posts: [],
    loading: false, 
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload?.posts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    }
  }
});


export default allPostsSlice.reducer;

