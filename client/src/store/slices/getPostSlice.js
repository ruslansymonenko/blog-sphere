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

export const getMyPosts = createAsyncThunk('posts/getMyPosts', async () => {
  let token = '';
  if(localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  try{
    const response = await axios.get('http://localhost:8000/posts/getMyPosts', {
      headers: {
        Authorization: token,
      }
    });
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const getPostsSlice = createSlice({
  name: 'getPosts',
  initialState: {
    posts: [],
    loading: false, 
    error: null,
  },
  reducers: {
    updateLikedPost: (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === updatedPost._id);
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
    },
  },
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
    },
    [getMyPosts.pending]: (state) => {
      state.loading = true;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload?.posts;
    },
    [getMyPosts.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export const { updateLikedPost } = getPostsSlice.actions;

export default getPostsSlice.reducer;

