import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../consts/consts';
import useSocket from '../../hooks/useSocket';

import { getComments, addComment, updateComments } from '../../store/slices/commentSlice';

import Comment from '../../components/Comment/Comment';
import AddCommentModal from '../../components/AddCommentModal/AddCommentModal';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const Comments = ({ postId }) => {
  const serverURL = SERVER_URL;
  const socket = useSocket(serverURL);
  const comments = useSelector(state => state.comment.comments);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleAddComment = (commentText, currentPostId) => {
    dispatch(addComment({
      text: commentText,
      postId: currentPostId,
    }));
  };

  useEffect(() => {
    dispatch(getComments({
      postId: postId
    }));
  }, [dispatch, postId]);

  // useEffect(() => {
    
  // }, [comments]);

  useEffect(() => {
    if (socket) {
      // Listen for 'add-comment' event
      socket.on('add-comment', (newComment) => {
        dispatch(updateComments(newComment));
      });
    }
  }, [socket, dispatch]);

  return (
    <>
      <Button
        className="m-2 text-light fw-bolder"
        variant="info"
        onClick={handleShowModal}
      >
        Add comment
      </Button>
      <hr className="w-100"/>
      <ListGroup className="w-75">
        {
          comments ? (
            comments.map(comment => (
              <Comment
                key={comment._id}
                text={comment.text}
              />
            ))
          ) : (
          <Comment
            text={'No comments yet...'}
          />
          )
        }
      </ListGroup>

      <AddCommentModal
        show={showModal}
        handleClose={handleCloseModal}
        commentedPost={postId}
        handleSendComment={handleAddComment}
      />
    </>
  )
}

export default Comments