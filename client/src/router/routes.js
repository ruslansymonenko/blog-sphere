import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MyPostsPage = lazy(() => import('../pages/MyPostsPage/MyPostsPage'));
const PostPage = lazy(() => import('../pages/PostPage/PostPage'));
const NewPostPage = lazy(() => import('../pages/NewPostPage/NewPostPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const MyAccountPage = lazy(() => import('../pages/MyAccountPage/MyAccountPage'));

export const routes = [
  {
    path: '/',
    element: <HomePage/>,
    private: false,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
    private: false,
  },
  {
    path: '/login',
    element: <LoginPage/>,
    private: false,
  },
  {
    path: '/myposts',
    element: <MyPostsPage/>,
    private: true,
  },
  {
    path: '/post/:id',
    element: <PostPage/>,
    private: false,
  },
  {
    path: '/newpost',
    element: <NewPostPage/>,
    private: true,
  },
  {
    path: '/myaccount',
    element: <MyAccountPage/>,
    private: true,
  },
];