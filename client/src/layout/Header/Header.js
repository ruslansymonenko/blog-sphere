import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function Header () {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Blog Sphere</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/myposts">My posts</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                My Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">
                Sing in
              </NavDropdown.Item>
              <NavDropdown.Item href="register">
                Sing up
              </NavDropdown.Item>
            </NavDropdown>
            <Button 
              variant="info"
              style={{marginLeft: '20px'}}
            >
              <Link className="text-decoration-none text-light fw-medium" to={'/newpost'}>New Post</Link>
            </Button>{' '}
          </Nav>
          <Button
            variant="dark"
          >
            Log out
          </Button>{' '}
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;