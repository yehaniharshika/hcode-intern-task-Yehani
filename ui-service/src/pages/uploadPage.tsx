import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [car_make, setCarMake] = useState("");
  const [car_model, setCarModel] = useState("");
  const [vin, setVin] = useState("");
  const [manufactured_date, setManufacturedDate] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8081/your-upload-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Upload Success:", data);
        alert("File uploaded successfully!");
      })
      .catch((err) => {
        console.error("Upload Error:", err);
        alert("Upload failed.");
      });
  };

  return (
    <div className="d-flex w-100 min-vh-100 bg-light">
      <Navigation />

      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#F4F6F9",
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        <Container fluid className="mt-3">
          <Row className="justify-content-center">
            {/* Upload Section */}
            <Col md={6} sm={12} className="mb-4">
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
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Upload Vehicle Data File
                </h4>
                <Form onSubmit={handleUpload}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Choose CSV or Excel File
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv, .xlsx"
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#283593",
                      borderColor: "#283593",
                      fontFamily: "'Montserrat', serif",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Upload
                  </Button>
                </Form>
              </div>
            </Col>

            {/* Manual Form */}
            <Col md={6} sm={12}>
              <div
                className="p-4 rounded shadow"
                style={{ backgroundColor: "#FFFFFF", marginTop: "50px" }}
              >
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={id}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={first_name}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={last_name}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      Car Make
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={car_make}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setCarMake(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      Car Model
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={car_model}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setCarModel(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      VIN
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={vin}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setVin(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      Manufactured Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={manufactured_date}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setManufacturedDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "13px",
                      }}
                    >
                      Age Of Vehicle
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={vin}
                      style={{ fontFamily: "'Montserrat', serif" }}
                      onChange={(e) => setVin(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UploadPage;
