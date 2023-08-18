import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import { getAllPosts, getMyPosts } from '../../store/slices/getPostSlice';
import { likePost } from '../../store/slices/postSlice';
import { updateLikedPost } from '../../store/slices/getPostSlice';

import Post from '../../components/Post/Post';
import InfoWindow from '../../components/InfoWindow/InfoWindow';

const Posts = ({type}) => {
  const serverURL = 'http://localhost:8000';
  const socket = useSocket(serverURL);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.getPosts.posts);

  const handleLikePost = (postId) => {
    dispatch(likePost(postId));
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