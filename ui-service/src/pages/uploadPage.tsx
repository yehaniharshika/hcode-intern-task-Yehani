import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createVehicle } from "../reducers/VehicleSlice";
import type { AppDispatch } from "../store/store";

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
        alert("Vehicle added successfully!");
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
                <h4 className="mb-4">Upload Vehicle Data File</h4>
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose CSV or Excel File</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv, .xlsx"
                    />
                  </Form.Group>
                  <Button type="submit" style={{ backgroundColor: "#283593" }}>
                    Upload
                  </Button>
                </Form>
              </div>
            </Col>

            <Col md={6} sm={12}>
              <div
                className="p-4 rounded shadow"
                style={{ backgroundColor: "#FFFFFF",marginTop: "40px",}}
              >
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Car Make</Form.Label>
                    <Form.Control
                      type="text"
                      value={car_make}
                      onChange={(e) => setCarMake(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Car Model</Form.Label>
                    <Form.Control
                      type="text"
                      value={car_model}
                      onChange={(e) => setCarModel(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control
                      type="text"
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Manufactured Date</Form.Label>
                    <Form.Control
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
                    <Form.Label>Age Of Vehicle</Form.Label>
                    <Form.Control
                      type="text"
                      value={age_of_vehicle}
                      readOnly 
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      onClick={handleAddVehicle}
                      style={{ fontWeight: "bold" }}
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
