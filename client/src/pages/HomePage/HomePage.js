import { Container, Col } from 'react-bootstrap';

import Posts from '../../containers/Posts/Posts';

import './HomePage.css';

const HomePage = () => {
  return (
    <Container>
        <Posts/>
    </Container>
  )
}

export default HomePage