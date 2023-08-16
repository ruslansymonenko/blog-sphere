import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../../store/slices/allPostSlice';

import Post from '../../components/Post/Post';
import Loader from '../../components/Loader/Loader';

import testImg from '../../assets/test-images/test-img.jpg';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
  }, [posts])

  return (
    <Col className="d-flex flex-column align-items-center">
      {
        !posts ? 
          <Loader/>
        :
        posts.map(post => (
          <Row key={post._id}>
            <Post
              post={post}
            />
          </Row>
        ))
      }
      {/* {posts.map(post => (
        <Row key={post._id}>
          <Post
            post={post}
          />
        </Row>
      ))} */}
    </Col>
  )
}

export default Posts