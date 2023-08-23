import ListGroup from 'react-bootstrap/ListGroup';


const Comment = ({text}) => {
  return (
    <ListGroup.Item className="mb-2">
      {text}
    </ListGroup.Item>
  )
}

export default Comment