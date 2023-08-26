import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';
import axios from 'axios';
import { likePost, getPostById } from '../../store/slices/postSlice';

import DetailedPost from "../../components/DetailedPost/DetailedPost";
import Comments from '../../containers/Comments/Comments';
import Loader from '../../components/Loader/Loader';

import { Container } from 'react-bootstrap';

const PostPage = () => {
  const post = useSelector(state => state.post.detailedPost)
  const params = useParams();
  const dispatch = useDispatch();

  const handleLikePost = (postId) => {
    dispatch(likePost(postId))
  }

  useEffect(() => {
    dispatch(getPostById(params.id));
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