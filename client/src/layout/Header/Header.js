import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';

import { checkIsAuth, logOut } from '../../store/slices/authSlice';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

function Header () {
  const user = useSelector(state => state.auth.user);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  
  useEffect(() => {
  }, [user]);

  const handleLogOut = () => {
    if (isAuth) {
      dispatch(logOut());
    } else {
      toast.warn('Log in first.');
    }
  };

  const authNotice = () => {
    toast.warn('Please, login first')
  }

  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link className="text-decoration-none text-dark" to={"/"}>Blog Sphere</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item className="d-flex flex-column align-items-center justify-content-center m-1">
              <Link className="text-decoration-none text-secondary" to={"/"}>Home</Link>
            </Nav.Item>
            {isAuth ? (
              <>
                <Nav.Item className="d-flex flex-column align-items-center justify-content-center m-1">
                  <Link className="text-decoration-none text-secondary" to={"/myposts"}>My posts</Link>
                </Nav.Item>
                <Nav.Item className="d-flex flex-column align-items-center justify-content-center m-1">
                  <Link className="text-decoration-none text-secondary" to={"/myaccount"}>My account</Link>
                </Nav.Item>
              </>
            ) : (
              ''
            )
            }
            {
              isAuth ? (
                ''
              ) : (
                <> 
                  <Nav.Item className="d-flex flex-column align-items-center justify-content-center m-1">
                    <Link className="text-decoration-none text-secondary" to={"/login"}>Login</Link>
                  </Nav.Item>
                  <Nav.Item className="d-flex flex-column align-items-center justify-content-center m-1">
                    <Link className="text-decoration-none text-secondary" to={"/register"}>Registration</Link>
                  </Nav.Item>
                </>
              )
            }
            {
              isAuth ? (
                <Button 
                  variant="info"
                  style={{marginLeft: '20px'}}
                >
                  <Link className="text-decoration-none text-light fw-medium" to={'/newpost'}>New Post</Link>
                </Button>
              ) : (
                <Button 
                  variant="secondary"
                  style={{marginLeft: '20px'}}
                  onClick={authNotice}
                >
                  New Post
                </Button>
              )
            }
            {user ? (
              <Nav.Item 
                className="d-flex align-items-center justify-content-center"
                style={{marginLeft: '20px'}}
              >
                <h2 className="fw-light fs-4">Hello, {user.name}</h2>
              </Nav.Item>
            ) : ''
            }
          </Nav>

          <Button
            variant="dark"
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;