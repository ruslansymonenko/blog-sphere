import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container>
      <Spinner animation="border" variant="info" />
    </Container>
  )
}

export default Loader