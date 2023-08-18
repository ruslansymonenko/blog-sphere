import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../../store/slices/allPostSlice';
import { likePost } from '../../store/slices/postSlice';

import Post from '../../components/Post/Post';
import Loader from '../../components/Loader/Loader';
import InfoWindow from '../../components/InfoWindow/InfoWindow';

import testImg from '../../assets/test-images/test-img.jpg';

const Posts = ({type}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.posts);

  const handleLikePost = (postId) => {
    dispatch(likePost(postId));
  }

  useEffect(() => {
    if(type === 'all') {
      dispatch(getAllPosts());
    } else if (type === 'user') {
      
    }
  }, []);

  useEffect(() => {
  }, [posts]);

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