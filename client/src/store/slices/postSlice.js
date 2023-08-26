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
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  try {
    const {data} = await axios.post(`/posts/deletepost`, {id});
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  try{
    const response = await axios.get('posts/getAllPosts');
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const getPostById = createAsyncThunk('posts/getPostById', async (id) => {
  try{
    const response = await axios.get(`posts/getpost/${id}`);
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
    const response = await axios.get('posts/getMyPosts', {
      headers: {
        Authorization: token,
      }
    });
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    detailedPost: null,
    loading: false,
    status: null,
    error: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
    updateLikedPost: (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === updatedPost._id);
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
    },
    removeDeletedPost: (state, action) => {
      const deletedPost = action.payload;
      state.posts = state.posts.filter(post => post._id !== deletedPost);
    },
  },
  extraReducers: {
    //Created psot
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    [createPost.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
    //Like psot
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
     //Delete psot
    [deletePost.pending]: (state) => {
      state.loading = true
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [deletePost.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
    //Get all posts
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
    //Get my posts
    [getMyPosts.pending]: (state) => {
      state.loading = true;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload?.posts;
    },
    [getMyPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Get Post by ID
    [getPostById.pending]: (state) => {
      state.loading = true;
    },
    [getPostById.fulfilled]: (state, action) => {
      state.loading = false;
      state.detailedPost = action.payload.post;
    },
    [getPostById.rejected]: (state) => {
      state.loading = false;
    }
  },
});

export const { clearStatus, updateLikedPost, removeDeletedPost } = postSlice.actions;

export default postSlice.reducer;

