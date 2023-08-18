import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getMe, checkIsAuth } from "./store/slices/authSlice";
import { getSocket, saveSocket } from "./store/slices/socketSlice";
import { routes } from './router/routes';
import { io } from 'socket.io-client';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./layout/Layout";
import Loader from "./components/Loader/Loader";

const socket = io.connect("http://localhost:8000");

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isAuth = useSelector(checkIsAuth);

  const PrivateRoute = ({children}) => {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
      if (!isLoading) {
        setAuthenticated(isAuth);
      }
    }, [isLoading, isAuth]);

    if (isLoading || authenticated === null) {
      return <Loader />;
    }

    return authenticated ? children : <Navigate to="/" />;
  }

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch]);

  useEffect(() => {
    socket.on('connection', () => {
    });

  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.private ? (
                  <PrivateRoute>{route.element}</PrivateRoute>
                ) : (
                  route.element
                )
              }
            />
            ))
          }
        </Route>
      </Routes>

      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
