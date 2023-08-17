import { lazy, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getMe, checkIsAuth } from "./store/slices/authSlice";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./layout/Layout";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MyPostsPage = lazy(() => import('./pages/MyPostsPage/MyPostsPage'));
const PostPage = lazy(() => import('./pages/PostPage/PostPage'));
const NewPostPage = lazy(() => import('./pages/NewPostPage/NewPostPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));


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
          <Route index path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/myposts" element={<MyPostsPage/>}/>

          <Route path="/post/:id" element={<PostPage/>}/>

          <Route 
            path="/newpost" 
            element={
              <PrivateRoute>
                <NewPostPage/>
              </PrivateRoute>
            }/>
        </Route>
      </Routes>

      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
