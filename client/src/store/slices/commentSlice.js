import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getComments = createAsyncThunk('comment/getComments', async ({postId}) => {
  try{
    const response = await axios.get(`comments/getComments/${postId}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
});

export const addComment = createAsyncThunk('comment/addComment', async ({text, postId}) => {
  try{
    const response = await axios.post('comments/addComment', {text, postId});
    return response.data
  } catch (error) {
    console.log(error);
  }
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: false,
    status: null
  },
  reducers: {
    updateComments: (state, action) => {
      const newComment = action.payload;
      if(state.comments) {
        state.comments.push(newComment)
      } else {
        state.comments = [newComment];
      }
    },
  },
  extraReducers: {
    [addComment.pending]: (state) => {
      state.loading = true
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    [addComment.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
    [getComments.pending]: (state) => {
      state.loading = true
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false
      state.status = null
      state.comments = action.payload.comments
    },
    [getComments.rejected]: (state) => {
      state.loading = false
      state.status = null
    },
  },
});

export const { updateComments } = commentSlice.actions;

export default commentSlice.reducer;