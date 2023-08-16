import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DetailedPost from "../../components/DetailedPost/DetailedPost";
import Loader from '../../components/Loader/Loader';

import { Container } from 'react-bootstrap';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const {data} = await axios.get(`http://localhost:8000/posts/getpost/${params.id}`);
    setPost(data.post);
  }, [params.id]);


  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <Container>
    {post ? 
      (
        <DetailedPost
          post={post}
        />
      ) : <Loader/>
    }
    </Container>
  )
}

export default PostPage