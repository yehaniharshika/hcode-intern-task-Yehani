import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createVehicle, importVehicles } from "../reducers/VehicleSlice";
import type { AppDispatch } from "../store/store";
import Swal from "sweetalert2";
import "../pages/style/alert.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");
const nameRegex = /^[A-Za-z\s]{2,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const vinRegex = /^[A-HJ-NPR-Z0-9]{12}$/;

interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  car_make?: string;
  car_model?: string;
  vin?: string;
  manufactured_date?: string;
}

const VehiclePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [car_make, setCarMake] = useState("");
  const [car_model, setCarModel] = useState("");
  const [vin, setVin] = useState("");
  const [manufactured_date, setManufacturedDate] = useState("");
  const [age_of_vehicle, setAgeOfVehicle] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleNotification = (data: any, type: "success" | "error") => {
      const id = Date.now();
      const newNotification = { ...data, type, id };
      setNotifications((prev) => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 10000);
    };

    socket.on("import-complete", (data) => handleNotification(data, "success"));
    socket.on("import-failed", (data) => handleNotification(data, "error"));

    return () => {
      socket.off("import-complete");
      socket.off("import-failed");
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      Swal.fire({
        title: "Please select a file first",
        icon: "info",
        confirmButtonText: "OK",
        background: "white",
        color: "black",
        confirmButtonColor: "green",
        timer: 3000,
        width: "450px",
        customClass: {
          title: "swal-title",
          popup: "swal-popup",
          confirmButton: "swal-button",
        },
      });
      return;
    }

    try {
      await dispatch(importVehicles(file)).unwrap();
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      Swal.fire(
        "❌ Error",
        (error as Error).message || "Failed to import file",
        "error"
      );
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // First Name validation
    if (!first_name.trim()) {
      errors.first_name = "First name is required.";
    } else if (!nameRegex.test(first_name)) {
      errors.first_name =
        "First name must be 2-30 characters and contain only letters and spaces.";
    }

    // Last Name validation
    if (!last_name.trim()) {
      errors.last_name = "Last name is required.";
    } else if (!nameRegex.test(last_name)) {
      errors.last_name =
        "Last name must be 2-30 characters and contain only letters and spaces.";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Car Make validation
    if (!car_make.trim()) {
      errors.car_make = "Car make is required.";
    }

    // Car Model validation
    if (!car_model.trim()) {
      errors.car_model = "Car model is required.";
    }

    // VIN validation
    if (!vin.trim()) {
      errors.vin = "VIN is required.";
    } else if (!vinRegex.test(vin)) {
      errors.vin =
        "VIN must be exactly 12 characters (letters I, O, Q not allowed).";
    }

    // Manufactured Date validation
    if (!manufactured_date) {
      errors.manufactured_date = "Manufactured date is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (fieldName: keyof ValidationErrors) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleAddVehicle = () => {
    if (!validateForm()) {
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
          timer: 3000,
          width: "450px",
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
        setAgeOfVehicle("");
      })
      .catch((error) => {
        alert("Error adding vehicle: " + error.message);
      });
  };

  return (
    <div className="d-flex w-100 min-vh-100 bg-light">
      <Navigation />
      {/* Notifications  */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          width: "320px",
        }}
      >
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`alert alert-${note.type} animate__animated animate__fadeInDown mb-2`}
            style={{
              fontSize: "15px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "6px",
              fontFamily: "'Montserrat', serif",
              fontWeight: "500",
              backgroundColor: "#b3e3e4",
              border: "3px solid #019394",
            }}
          >
            {note.message}
          </div>
        ))}
      </div>
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
                      ref={fileInputRef}
                      type="file"
                      accept=".csv, .xlsx"
                      style={{
                        fontFamily: "'Montserrat', serif",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  <Button
                    onClick={handleImport}
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
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearFieldError("first_name");
                      }}
                      className={
                        validationErrors.first_name ? "is-invalid" : ""
                      }
                    />
                    {validationErrors.first_name && (
                      <div
                        style={{
                          color: "#dc3545",
                          fontSize: "14px",
                          marginTop: "5px",
                          fontFamily: "'Montserrat', serif",
                        }}
                      >
                        {validationErrors.first_name}
                      </div>
                    )}
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
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearFieldError("last_name");
                      }}
                      className={validationErrors.last_name ? "is-invalid" : ""}
                    />
                    {validationErrors.last_name && (
                      <div
                        style={{
                          color: "#dc3545",
                          fontSize: "14px",
                          marginTop: "5px",
                          fontFamily: "'Montserrat', serif",
                        }}
                      >
                        {validationErrors.last_name}
                      </div>
                    )}
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                      className={validationErrors.email ? "is-invalid" : ""}
                    />
                    {validationErrors.email && (
                      <div
                        style={{
                          color: "#dc3545",
                          fontSize: "14px",
                          marginTop: "5px",
                          fontFamily: "'Montserrat', serif",
                        }}
                      >
                        {validationErrors.email}
                      </div>
                    )}
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
                          onChange={(e) => {
                            setCarMake(e.target.value);
                            clearFieldError("car_make");
                          }}
                          className={
                            validationErrors.car_make ? "is-invalid" : ""
                          }
                        />
                        {validationErrors.car_make && (
                          <div
                            style={{
                              color: "#dc3545",
                              fontSize: "14px",
                              marginTop: "5px",
                              fontFamily: "'Montserrat', serif",
                            }}
                          >
                            {validationErrors.car_make}
                          </div>
                        )}
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
                          onChange={(e) => {
                            setCarModel(e.target.value);
                            clearFieldError("car_model");
                          }}
                          className={
                            validationErrors.car_model ? "is-invalid" : ""
                          }
                        />
                        {validationErrors.car_model && (
                          <div
                            style={{
                              color: "#dc3545",
                              fontSize: "14px",
                              marginTop: "5px",
                              fontFamily: "'Montserrat', serif",
                            }}
                          >
                            {validationErrors.car_model}
                          </div>
                        )}
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
                      onChange={(e) => {
                        setVin(e.target.value);
                        clearFieldError("vin");
                      }}
                      className={validationErrors.vin ? "is-invalid" : ""}
                    />
                    {validationErrors.vin && (
                      <div
                        style={{
                          color: "#dc3545",
                          fontSize: "14px",
                          marginTop: "5px",
                          fontFamily: "'Montserrat', serif",
                        }}
                      >
                        {validationErrors.vin}
                      </div>
                    )}
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
                        clearFieldError("manufactured_date");

                        // Calculate vehicle age
                        const manufactureYear = new Date(
                          selectedDate
                        ).getFullYear();
                        const currentYear = new Date().getFullYear();
                        const age = currentYear - manufactureYear;
                        setAgeOfVehicle(age.toString());
                      }}
                      className={
                        validationErrors.manufactured_date ? "is-invalid" : ""
                      }
                    />
                    {validationErrors.manufactured_date && (
                      <div
                        style={{
                          color: "#dc3545",
                          fontSize: "14px",
                          marginTop: "5px",
                          fontFamily: "'Montserrat', serif",
                        }}
                      >
                        {validationErrors.manufactured_date}
                      </div>
                    )}
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

export default VehiclePage;
