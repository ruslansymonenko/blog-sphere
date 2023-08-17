import { lazy, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getMe, checkIsAuth } from "./store/slices/authSlice";
import { routes } from './router/routes';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./layout/Layout";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const PrivateRoute = ({children}) => {
    return isAuth ? children : <Navigate to="/"/>
  }

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

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
