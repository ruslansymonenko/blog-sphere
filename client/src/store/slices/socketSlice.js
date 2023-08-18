import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

// export const getSocket = () => {
//   const socket = io.connect("http://localhost:8000");
//   socket.on("connect", () => {
//     return socket;
//   });
// }

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socketId: null,
  },
  reducers: {
    saveSocket: (state, action) => {
      if (action.payload.socket) {
        state.socketId = action.payload.socket;
      } else {
        state.socketId = null;
      }
    }
  }
});


export const { saveSocket } = socketSlice.actions;

export default socketSlice.reducer;
