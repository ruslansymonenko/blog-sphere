import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


import { registerUser } from '../../store/slices/authSlice';
import authFormValidation from '../../helpers/authFormValidation';

import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formValidation = authFormValidation(email, password, name);

    if(formValidation.validation === true) {
      try{
        dispatch(registerUser({name, email, password}));
        clearForm();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error(formValidation.message);
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
        <h2 className="mb-4">Registration</h2>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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

export default RegisterPage;