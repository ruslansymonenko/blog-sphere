import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, email, password }) => {
  try{
    const { data } = await axios.post('/auth/register', {
      name,
      email,
      password
    });

    if(data.token) {
      window.localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    try{
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });

      if(data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
});

export const getMe = createAsyncThunk('auth/getMe', async () => {
    let token = '';
    if(localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    try{
      const { data } = await axios.get('/auth/me', {
        headers: {
          Authorization: token,
        }
      });
      if (data) {
        return data
      }
    } catch (error) {
      console.log(error);
    }
});

const authSlice = createSlice({
  name:'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    status: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;

      localStorage.removeItem('token');
    }
  },
  extraReducers: {
    //Register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Auth check
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const checkIsAuth = state => Boolean(state.auth.token);

export const { logOut } = authSlice.actions;

export default authSlice.reducer;