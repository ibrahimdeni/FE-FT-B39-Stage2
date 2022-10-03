import { Button, Container, Navbar } from "react-bootstrap";
import iconTJ from "../assets/icons/icontj.png";
import { useState } from "react";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";

function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShowR(false);
  };
  console.log("showwww", show);

  const [registerShow, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => {
    setShowR(true);
    setShow(false);
  };
  console.log("rshow", registerShow);
  return (
    <Navbar className="sticky-top w-100 shadow" bg="transparent" expand="lg">
      <Container fluid>
        <div className="icon">
          <Navbar.Brand href="#">
            <img src={iconTJ} className="shadow" alt="" />
          </Navbar.Brand>
        </div>
        <div className="ms-auto">
          <Navbar.Collapse id="navbarScroll" className="w-100">
            <div className="w-50">
              <Button
                className="text-dark fw-semibold me-2 w-100 px-4"
                variant="outline-light"
                onClick={handleShow}
              >
                Login
              </Button>
              <LoginModal handleClose={handleClose} show={show} />
            </div>
            <div className="w-50">
              <Button
                className="btn-primary fw-semibold text-light ms-2 w-100  px-4"
                variant="outline-primary"
                onClick={handleShowR}
              >
                Register
              </Button>
              <RegisterModal
                handleCloseR={handleCloseR}
                registerShow={registerShow}
              />
            </div>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
