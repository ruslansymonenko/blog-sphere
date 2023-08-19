import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './Account.css';
import unknownUserImage from '../../assets/icons/unknown-user.png';

const Account = () => {
  return (
    <Card.Body 
      className="bg-light p-4"

    >
      <Card.Title className="mb-4">My Account</Card.Title>
      <Row>
        <Col className="d-flex flex-column align-items-center m-1">
          <Image className="account__user-img shadow mb-4" src={unknownUserImage} roundedCircle />
          <Button className="text-light" variant="info">Change</Button>
        </Col>
        <Col className="m-1 shadow-sm p-4">
          <Row>
            <Card.Subtitle className="text-center mb-2">
              Account info
            </Card.Subtitle>
          </Row>
          <Row className="w-100 mb-1">
            <Col>Registration date:</Col>
            <Col className="d-flex justify-content-end">
              18.08.2023
            </Col>
          </Row>
          <Row className="w-100 mb-1">
            <Col>Posts:</Col>
            <Col className="d-flex justify-content-end">
              3
            </Col>
          </Row>
          <Row className="w-100 mb-1">
            <Col>Likes:</Col>
            <Col className="d-flex justify-content-end">
              20
            </Col>
          </Row>
          <Row className="w-100 mb-1">
            <Col>Views:</Col>
            <Col className="d-flex justify-content-end">
              35
            </Col>
          </Row>
        </Col>
        <Col className="d-flex flex-column align-items-center m-1">
          <Row className="shadow p-2 m-4 w-100">
            <Card.Text>
              User
            </Card.Text>
          </Row>
          <Row>
            <Button className="text-light w-100 mb-2" variant="info">Change name</Button>
          </Row>
          <Row>
            <Button className="text-light w-100 mb-2" variant="info">Personal info</Button>
          </Row>
        </Col>
      </Row>
    </Card.Body>
  )
}

export default Account