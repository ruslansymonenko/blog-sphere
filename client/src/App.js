import { lazy } from "react";
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "./layout/Layout";

import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MyPostsPage = lazy(() => import('./pages/MyPostsPage/MyPostsPage'));
const PostPage = lazy(() => import('./pages/PostPage/PostPage'));



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index path="/" element={<HomePage/>}/>
          <Route path="/myposts" element={<MyPostsPage/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
