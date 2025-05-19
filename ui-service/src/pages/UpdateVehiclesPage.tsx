import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Table, Button, Container, Form } from "react-bootstrap";

const UpdateVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);

  return (
    <div className="d-flex w-100 min-vh-100">
      <Navigation />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#c5cbe9" }}>
        <Container fluid className="mt-3">
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: "#3F51B5",
              color: "white",
              marginTop: "50px",
            }}
          >
            <h4
              className="mb-4"
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "20px",
              }}
            >
              Export Vehicle Data File
            </h4>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label
                  style={{
                    fontFamily: "'Montserrat', serif",
                    fontSize: "14px",
                  }}
                >
                  Vehicle Age
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Age"
                  style={{
                    fontFamily: "'Montserrat', serif",
                    fontSize: "14px",
                  }}
                  onChange={(e) => e.target.value}
                />
              </Form.Group>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#283593",
                  fontFamily: "'Montserrat', serif",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Export File
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UpdateVehiclesPage;
