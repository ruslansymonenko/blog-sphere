import { lazy, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getMe } from "./store/slices/authSlice";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./layout/Layout";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MyPostsPage = lazy(() => import('./pages/MyPostsPage/MyPostsPage'));
const PostPage = lazy(() => import('./pages/PostPage/PostPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
  const dispatch = useDispatch();

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
        </Route>
      </Routes>

      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
