import Alert from 'react-bootstrap/Alert';

const InfoWindow = ({message}) => {
  return (
    <Alert variant="info">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>
        {message}
      </p>
      <hr />
      <p className="mb-0">
        Please try again later
      </p>
    </Alert>
  );
}

export default InfoWindow