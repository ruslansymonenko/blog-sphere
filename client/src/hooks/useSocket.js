import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const useSocket = (serverURL) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = socketIOClient(serverURL);
    setSocket(socketInstance);

    // Clean up the socket connection when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, [serverURL]);

  return socket;
};

export default useSocket;
