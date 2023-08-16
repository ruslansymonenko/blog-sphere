import { Container, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './DetailedPost.css';

import userImg from '../../assets/icons/user-icon.svg';
import likeImg from '../../assets/icons/like-icon.svg';
import viewsImg from '../../assets/icons/eye-icon.svg';
import commentImg from '../../assets/icons/comment-icon.svg';

const DetailedPost = ({post}) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="m-2 p-0" style={{ width: '70rem' }}>
            <div className="d-flex justify-content-center align-items-center pt-2">
              <Card.Img
                className="post-card__image"
                variant="top"
                src={post.imageSrc ? post.imageSrc : ''}
              />
            </div>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.text}
                  </Card.Text>
                  <Button variant="light">Like post</Button>
                </Col>
                <Col className="d-flex flex-column justify-content-around align-items-center">
                  <Row className="w-100">
                    <Col className="d-flex justify-content-end align-items-center">
                      <img className="card-icon" src={userImg} alt="author" />
                    </Col>
                    <Col>
                      <span className="d-block">
                        {post.userName}
                      </span>
                    </Col>
                  </Row>
                  <Row className="w-100">
                    <Col className="d-flex justify-content-end align-items-center">
                      <img className="card-icon" src={viewsImg} alt="views" />
                    </Col>
                    <Col>
                      <span className="d-block">
                        {post.views + 1}
                      </span>             
                    </Col>
                  </Row>
                  <Row className="w-100">
                    <Col className="d-flex justify-content-end align-items-center">
                      <img className="card-icon" src={likeImg} alt="likes" />
                    </Col>
                    <Col>
                      <span className="d-block">
                        {post.likes}
                      </span>                
                    </Col>
                  </Row>
                  <Row className="w-100">
                    <Col className="d-flex justify-content-end align-items-center">
                      <img className="card-icon" src={commentImg} alt="likes" />
                    </Col>
                    <Col>
                      <span className="d-block">
                        {post.comments.length}
                      </span>                
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailedPost