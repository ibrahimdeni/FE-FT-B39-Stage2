import Card from "react-bootstrap/Card";
import Thumbnail from "../assets/images/imgdtl.png";

function BasicExample() {
  return (
    <Card style={{ width: "18rem", height: "23rem" }} className="my-5">
      <Card.Img variant="top" src={Thumbnail} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
