import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Container, Modal, Button } from "react-bootstrap";

const Logout = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setShow(false);
    navigate("/login");
  };

  const handleClose = () => {
    setShow(false);
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="flex overflow-hidden bg-emerald-200">
      <Navigation />
      <div className="flex-1 p-5" style={{ backgroundColor: "#c5cbe9" }}>
        <Container fluid>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontWeight: "750",
                }}
              >
                Confirm Logout
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "15px",
                fontWeight: "550",
              }}
            >
              Are you sure you want to log out?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontSize: "15px",
                  fontWeight: "550",
                }}
              >
                No
              </Button>
              <Button
                variant="danger"
                onClick={handleLogout}
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontSize: "15px",
                  fontWeight: "550",
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default Logout;
