import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Journey() {
  return (
    <div>
      <h1 className="fw-bold ms-5 mt-4">Journey</h1>
      <div className="mt-4 search-engine mx-auto">
        <InputGroup className="mb-3">
          <Form.Control
            className="PH_home py-2"
            placeholder="Find Journey"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text
            className="px-5 bg-primary fw-semibold text-light"
            id="basic-addon2"
          >
            Search
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
}
