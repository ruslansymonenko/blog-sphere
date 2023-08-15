import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../../store/slices/allPostSlice';

import Post from '../../components/Post/Post';

import testImg from '../../assets/test-images/test-img.jpg';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.posts);
  // const posts = [
  //   {
  //     _id: 1,
  //     title: 'Post about travel',
  //     text: 'Hello this is my story, about traveling. I want to tell you anout it.',
  //     imageSrc: testImg,
  //     views: 0,
  //     likes: 0,
  //     name: 'some user'
  //   },
  //   {
  //     _id: 2,
  //     title: 'Post about travel',
  //     text: 'Hello this is my story, about traveling. I want to tell you anout it.',
  //     imageSrc: testImg,
  //     views: 0,
  //     likes: 0,
  //     name: 'some user'
  //   },
  //   {
  //     _id: 3,
  //     title: 'Post about travel',
  //     text: 'Hello this is my story, about traveling. I want to tell you anout it.',
  //     imageSrc: '',
  //     views: 0,
  //     likes: 0,
  //     name: 'some user'
  //   }
  // ];

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts])

  return (
    <Col className="d-flex flex-column align-items-center">
      {posts.map(post => (
        <Row key={post._id}>
          <Post
            post={post}
          />
        </Row>
      ))}
    </Col>
  )
}

export default Posts