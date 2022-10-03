import Layout from "../components/NavigationBar";
import { Form, Button } from "react-bootstrap";
import TextEditor from "../components/TextEditor";

export default function NewJourney() {
  return (
    <>
      <Layout />
      <div className="d-flex w-100 mt-5">
        <div className="title-NJ mx-auto">
          <h1 className="fw-bold text-start">New Journey</h1>
        </div>
      </div>
      <div className="w-100 d-flex mb-5">
        <Form className="form_NJ mx-auto mt-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold fs-5">Title</Form.Label>
            <Form.Control type="text" placeholder="" />
            <Form.Label className="fw-bold fs-5 mt-3">Main Photo</Form.Label>
            <Form.Control type="file" />
            <Form.Label className="fw-bold fs-5 mt-3">Description</Form.Label>
            <TextEditor />
          </Form.Group>
          <div className="w-100 d-flex">
            <Button className="ms-auto btn_post fw-semibold" type="submit">
              Post
            </Button>
          </div>
        </Form>
      </div>
      <div></div>
    </>
  );
}
