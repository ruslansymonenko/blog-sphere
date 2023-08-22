import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createPost } from '../../store/slices/postSlice';
import { toast } from 'react-toastify';

import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const NewPostPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.post);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const clearForm = () => {
    setTitle('');
    setText('');
    setImage('');
  };

  const handleSubmit = () => {
    if (title) {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);

      dispatch(createPost(data));

      clearForm();
    } else {
      toast.warn('Title is required');
    }
    try {
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancel = () => {
    clearForm();
  };

  useEffect(() => {
    toast(status);
  }, [status]);

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Post title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="your post title..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Post text</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Choose photo</Form.Label>
          <Form.Control 
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group>
          {
            image ? (
              <Image src={URL.createObjectURL(image)} thumbnail />
            ) : (
              ''
            )
          }
        </Form.Group>
        <Form.Group>
          <Button 
            className="m-2" 
            variant="info"
            onClick={handleSubmit}
          >
            Post
          </Button>
          <Button 
            className="m-2" 
            variant="light"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default NewPostPage