import { Container } from "react-bootstrap";

const DetailedPost = ({post}) => {
  return (
    <Container>
      <div>
        {post.title}
      </div>
    </Container>
  )
}

export default DetailedPost