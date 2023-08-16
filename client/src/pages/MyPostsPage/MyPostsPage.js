import Posts from '../../containers/Posts/Posts';

import { Container } from 'react-bootstrap';

const MyPostsPage = () => {
  return (
    <div className="myposts">
      <Container>
        <Posts
          type={'user'}
        />
      </Container>
    </div>
  )
}

export default MyPostsPage