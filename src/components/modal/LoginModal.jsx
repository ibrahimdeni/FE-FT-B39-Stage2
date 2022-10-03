import { Button, Form, Modal } from "react-bootstrap";
import Leaf from "../../assets/icons/LEAF.png";
import Map from "../../assets/icons/map.png";

function Example({ handleClose, show }) {
  return (
    <>
      <Modal className="mt-3 modalregister" show={show} onHide={handleClose}>
        <img
          src={Map}
          className="rounded-3"
          style={{
            width: "50px",
            position: "fixed",
            left: "35.07%",
            marginTop: "0px",
          }}
          alt=""
        />
        <img
          src={Leaf}
          alt=""
          className="rounded-2"
          style={{
            position: "fixed",
            width: "90px",
            // top: "auto",
            left: "58.33%",
            objectFit: "cover",
          }}
        />
        <div className="mx-5">
          <div className="my-5">
            <h2 className="text-center fw-bold">Login </h2>
          </div>
          <div style={{ marginBottom: "10%" }}>
            <Form>
              <Form.Group className="mb-3" controlId="emailLogin">
                <Form.Label className="fw-bold fs-5">Email</Form.Label>
                <Form.Control type="email" placeholder="" autoFocus />
              </Form.Group>
              <Form.Group className="mb-3" controlId="passwordLogin">
                <Form.Label className="fw-bold fs-5">Password</Form.Label>
                <Form.Control type="password" placeholder="" autoFocus />
              </Form.Group>
            </Form>
          </div>
          <div className="mb-4">
            <Button
              variant="primary w-100 fw-semibold fs-4"
              onClick={handleClose}
            >
              Login
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Example;
