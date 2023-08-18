import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    const {data} = await axios.post('posts/addpost', params);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (id) => {
  try {
    const {data} = await axios.patch('posts/likepost', {id});
    return data;
  } catch (error) {
    console.log(error);
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    loading: false,
    status: null,
  },
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      // state.posts.push(action.payload)
      state.status = action.payload.message
    },
    [createPost.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
    [likePost.pending]: (state) => {
      state.loading = true
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = null;
    },
    [likePost.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
  },
});

export default postSlice.reducer;

