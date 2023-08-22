import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useLayoutEffect } from 'react';
import useSocket from '../../hooks/useSocket';
import { getAllPosts, getMyPosts ,updateLikedPost, likePost, deletePost, removeDeletedPost } from '../../store/slices/postSlice';
import { toast } from 'react-toastify';
import { clearStatus } from '../../store/slices/postSlice';

import Post from '../../components/Post/Post';
import InfoWindow from '../../components/InfoWindow/InfoWindow';

import { Col, Row } from 'react-bootstrap';

const Posts = ({type}) => {
  const serverURL = 'http://localhost:8000';
  const socket = useSocket(serverURL);
  const posts = useSelector((state) => state.post.posts);
  const { status } = useSelector(state => state.post);
  const [shouldDisplayToast, setShouldDisplayToast] = useState(false);

  const dispatch = useDispatch();

  const handleLikePost = (postId) => {
    dispatch(likePost(postId));
  }

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
    dispatch(removeDeletedPost(postId));
  }

  useEffect(() => {
    if(type === 'all') {
      dispatch(getAllPosts());
    } else if (type === 'user') {
      dispatch(getMyPosts());
    }
  }, []);


  useEffect(() => {
    if (socket) {
      // Listen for 'like-post' event
      socket.on('like-post', (updatedPost) => {
        dispatch(updateLikedPost(updatedPost));
      });
    }
  }, [socket, dispatch]);

  useLayoutEffect(() => {
    dispatch(clearStatus());
    setShouldDisplayToast(true);
  }, []);

  useEffect(() => {
    if (status !== null && shouldDisplayToast) {
      toast.info(status);
      dispatch(clearStatus());
    }
  }, [status, shouldDisplayToast, dispatch]);

  return (
    posts ? (
      <Col className="d-flex flex-column align-items-center w-100">
        {
          posts.length <= 0 ? 
            <InfoWindow
              message={'Sorry, there are no posts available to view at the moment.'}
            />
          :
          posts.map(post => (
            <Row key={post._id}>
              <Post
                post={post}
                likeFunction={handleLikePost}
                type={type}
                deleteFunction={handleDeletePost}
              />
            </Row>
          ))
        }
      </Col>
    ) : (
      <InfoWindow
        message={'Sorry, there are no posts available to view at the moment.'}
      />
    )

  )
}

export default Posts