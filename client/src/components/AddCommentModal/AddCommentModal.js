import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddCommentModal = ({show, handleClose, commentedPost, handleSendComment}) => {
  const [userCommentText, setUserCommentText] = useState('');

  const handleChangeText = (event) => {
    setUserCommentText(event.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Write your comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Your text</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              onChange={(event) => handleChangeText(event)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant="info"
          onClick={() => {
            handleSendComment(userCommentText, commentedPost)
            handleClose()
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddCommentModal