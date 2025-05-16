import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createVehicle } from "../reducers/VehicleSlice";
import type { AppDispatch } from "../store/store";
import Swal from "sweetalert2";
import "../pages/style/alert.css";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [car_make, setCarMake] = useState("");
  const [car_model, setCarModel] = useState("");
  const [vin, setVin] = useState("");
  const [manufactured_date, setManufacturedDate] = useState("");
  const [age_of_vehicle, setAgeOfVehicle] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddVehicle = () => {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !car_make ||
      !car_model ||
      !vin ||
      !manufactured_date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(
      createVehicle({
        first_name,
        last_name,
        email,
        car_make,
        car_model,
        vin,
        manufactured_date,
        age_of_vehicle,
      })
    )
      .unwrap()
      .then(() => {
        console.log("success");
        console.log(
          first_name,
          last_name,
          email,
          car_make,
          car_model,
          vin,
          manufactured_date
        );
        Swal.fire({
          title: "✅ Success!",
          html: '<p class="swal-text">Vehicle saved successfully.</p>',
          icon: "success",
          confirmButtonText: "OK",
          background: "white",
          color: "black",
          confirmButtonColor: "green",
          timer: 3000, // Auto-close after 10 seconds
          width: "450px", // Small window size
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
            confirmButton: "swal-button",
          },
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setCarMake("");
        setCarModel("");
        setVin("");
        setManufacturedDate("");
      })
      .catch((error) => {
        alert("Error adding vehicle: " + error.message);
      });
  };

  return (
    <div className="d-flex w-100 min-vh-100 bg-light">
      <Navigation />
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#c5cbe9",
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        <Container fluid className="mt-3">
          <Row className="justify-content-center">
            <Col md={6} sm={12} className="mb-4">
              <div
                className="p-4 rounded shadow"
                style={{
                  backgroundColor: "#3F51B5",
                  color: "white",
                  marginTop: "40px",
                }}
              >
                <h4
                  className="mb-4"
                  style={{
                    fontFamily: "'Montserrat', serif",
                    fontSize: "20px",
                  }}
                >
                  Upload Vehicle Data File
                </h4>
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
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
                        fontSize: "14px",
                      }}
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
                    Upload
                  </Button>
                </Form>
              </div>
            </Col>

            <Col md={6} sm={12}>
              <div
                className="p-4 rounded shadow"
                style={{
                  backgroundColor: "#FFFFFF",
                  marginTop: "40px",
                  border: "3px solid #3F51B5",
                }}
              >
                <Form>
                  <h4
                    className="mb-4"
                    style={{
                      fontFamily: "'Montserrat', serif",
                      fontSize: "20px",
                    }}
                  >
                    Vehicle Details Form
                  </h4>
                  <hr />
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={first_name}
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label
                          style={{
                            fontFamily: "'Montserrat', serif",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Car Make
                        </Form.Label>
                        <Form.Control
                          style={{
                            fontFamily: "'Montserrat', serif",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          type="text"
                          value={car_make}
                          onChange={(e) => setCarMake(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label
                          style={{
                            fontFamily: "'Montserrat', serif",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Car Model
                        </Form.Label>
                        <Form.Control
                          style={{
                            fontFamily: "'Montserrat', serif",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          type="text"
                          value={car_model}
                          onChange={(e) => setCarModel(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      VIN
                    </Form.Label>
                    <Form.Control
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      type="text"
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Manufactured Date
                    </Form.Label>
                    <Form.Control
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      type="date"
                      value={manufactured_date}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        setManufacturedDate(selectedDate);

                        // Calculate vehicle age
                        const manufactureYear = new Date(
                          selectedDate
                        ).getFullYear();
                        const currentYear = new Date().getFullYear();
                        const age = currentYear - manufactureYear;
                        setAgeOfVehicle(age.toString());
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Age Of Vehicle
                    </Form.Label>
                    <Form.Control
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      type="text"
                      value={age_of_vehicle}
                      readOnly
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      onClick={handleAddVehicle}
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Add Vehicle
                    </Button>
                  </div>
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
