import { Server } from 'socket.io';

let ioInstance;

export const initializeSocketIO = (httpServer) => {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

  ioInstance.on("connection", (socket) => {

  });
};

export const getSocketIOInstance = () => {
  return ioInstance;
};