import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

import { getShorterText } from '../../helpers/getShorterText';

import './Post.css';

import userImg from '../../assets/icons/user-icon.svg';
import likeImg from '../../assets/icons/like-icon.svg';
import likeImgRed from '../../assets/icons/like-icon-red.svg';
import viewsImg from '../../assets/icons/eye-icon.svg';
import commentImg from '../../assets/icons/comment-icon.svg';

const Post = ({post, likeFunction, type, deleteFunction}) => {
  const postShortText = getShorterText(post.text, 7);
  const [updatedLike, setUpdatedLike] = useState(false);
  const isInitialRender = useRef(true);
  const [privatePost, setPrivatePost] = useState(false);

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the effect for the initial render
      isInitialRender.current = false;
    } else {
      setUpdatedLike(true);
      setTimeout(() => {
        setUpdatedLike(false);
      }, 700);
    }
  }, [post]);

  useEffect(() => {
    if(type === 'all') {
      setPrivatePost(false);
    } else if (type === 'user') {
      setPrivatePost(true);
    }
  }, []);

  return (
    <Card className="m-2 p-0" style={{ width: '70rem' }}>
      {
        privatePost ? (
          <Button 
            className="delete-btn" 
            variant="danger"
            onClick={() => deleteFunction(post._id)}
          >
            Delete
          </Button>
        ) : (
          ''
        )
      }
      {
        post.imageSrc ? (
        <div className="d-flex justify-content-center align-items-center pt-2">
          <Card.Img
            className="post-card__image"
            variant="top"
            src={`http://localhost:8000/${post.imageSrc}`}
          />
        </div>
        ) : (
          ''
        )
      }
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {postShortText}
            </Card.Text>
            <Button className="m-2" variant="info">
              <Link className="text-decoration-none text-light" to={`/post/${post._id}`}>Read post</Link>
            </Button>
            <Button 
              variant="light"
              onClick={() => likeFunction(post._id)}
            >
              Like post
            </Button>
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
                  {post.views}
                </span>             
              </Col>
            </Row>
            <Row className="w-100">
              <Col className="d-flex justify-content-end align-items-center">
                <img 
                  className={`card-icon ${updatedLike ? 'bounce' : ''}`}
                  src={`${updatedLike ? likeImgRed : likeImg}`} 
                  alt="likes" 
                />
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
  )
}

export default Post