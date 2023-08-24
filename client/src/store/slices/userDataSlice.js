import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getUserPostsLikes = createAsyncThunk('userData/userLikes', async ({userId}) => {
  try{
    const response = await axios.get(`user/getLikes/${userId}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const getUserPostsViews = createAsyncThunk('userData/getViews', async ({userId}) => {
  try{
    const response = await axios.get(`user/getViews/${userId}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const getUserPostsComments = createAsyncThunk('userData/getComments', async ({userId}) => {
  try{
    const response = await axios.get(`user/getComments/${userId}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
});

const userDataSlice = createSlice ({
  name: 'userData',
  initialState: {
    user: null,
    userPostsLikes: 0,
    userPostsComments: 0,
    userPostsViews: 0,
    loading: false,
    status: null,
  },
  extraReducers: {
    //Likes
    [getUserPostsLikes.pending]: (state) => {
      state.loading = true
    },
    [getUserPostsLikes.fulfilled]: (state, action) => {
      state.loading = false
      state.userPostsLikes = action.payload.totalLikes;
    },
    [getUserPostsLikes.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
    //Views
    [getUserPostsViews.pending]: (state) => {
      state.loading = true
    },
    [getUserPostsViews.fulfilled]: (state, action) => {
      state.loading = false
      state.userPostsViews = action.payload.totalViews;
    },
    [getUserPostsViews.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
    //Comments
    [getUserPostsComments.pending]: (state) => {
      state.loading = true
    },
    [getUserPostsComments.fulfilled]: (state, action) => {
      state.loading = false
      state.userPostsComments = action.payload.totalComments;
    },
    [getUserPostsComments.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
  }
});

export default userDataSlice.reducer;