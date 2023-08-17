import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from '../../store/slices/authSlice';

import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(email && password) {
      try {
        dispatch(loginUser({ email, password }));
        clearForm();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Please fill all inputs');
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearForm();
  };

  useEffect(() => {
    toast(status);
  }, [status]);

  return (
    <Container>
      <Form>
        <h2 className="mb-4">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
        <Button 
          className="m-2" 
          variant="info" 
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button 
          className="m-2" 
          variant="light" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage;