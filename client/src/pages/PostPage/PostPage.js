import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { likePost } from '../../store/slices/postSlice';

import DetailedPost from "../../components/DetailedPost/DetailedPost";
import Comments from '../../containers/Comments/Comments';
import Loader from '../../components/Loader/Loader';

import { Container } from 'react-bootstrap';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const fetchPost = useCallback(async () => {
    const {data} = await axios.get(`http://localhost:8000/posts/getpost/${params.id}`);
    setPost(data.post);
  }, [params.id]);

  const handleLikePost = (postId) => {
    dispatch(likePost(postId))
  }

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
  }, [post]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-around">
    {post ? 
      (
        <>
          <DetailedPost
            post={post}
            likeFunction={handleLikePost}
          />
          <Comments
            postId={post._id}
          />
        </>
      ) : <Loader/>
    }
    </Container>
  )
}

export default PostPage