import { useSelector } from 'react-redux';
import { checkIsAuth } from '../../store/slices/authSlice';

import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

const NewPostPage = () => {
  const isAuth = useSelector(checkIsAuth);


  return (
    <Container>NewPostPage</Container>
  )
}

export default NewPostPage