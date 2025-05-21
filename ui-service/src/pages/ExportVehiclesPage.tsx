import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "../components/Navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { exportVehicles } from "../reducers/VehicleSlice";
import type { AppDispatch } from "../store/store";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import "animate.css";
import "./style/ExportVehiclesPage.css";

const socket = io("http://localhost:4000");

const ExportVehiclesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [age, setAge] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const handleNotification = (data: any, type: "success" | "error") => {
      const id = Date.now();
      const newNotification = { ...data, type, id };
      setNotifications((prev) => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 10000);
    };

    socket.on("export-complete", (data) => handleNotification(data, "success"));
    socket.on("export-failed", (data) => handleNotification(data, "error"));

    return () => {
      socket.off("export-complete");
      socket.off("export-failed");
    };
  }, []);

  const handleExport = async () => {
    if (!age || isNaN(Number(age))) {
      Swal.fire("Warning", "Please enter a valid numeric age.", "warning");
      return;
    }

    try {
      await dispatch(exportVehicles(Number(age)));
      Swal.fire({
        title: "Export Requested",
        html: '<p class="swal-text">The export is being processed.</p>',
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
    } catch (error: any) {
      Swal.fire("Error", error.message || "Failed to export vehicles", "error");
    }
  };

  return (
    <div className="d-flex w-100 min-vh-100">
      <Navigation />

      {/* Notifications floating top-right */}
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
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "6px",
              fontFamily: "'Montserrat', serif",
              fontWeight:"500",
              backgroundColor:"#e09c95",
              border:"2px solid red"
            }}
          >
            {note.message}
            {note.downloadUrl && (
              <div className="mt-2 d-flex justify-content-end">
                <Button
                  variant={note.type === "danger" ? "success" : "danger"}
                  size="sm"
                  href={note.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "650",
                    fontSize: "14px",
                    fontFamily: "'Montserrat', serif",
                  }}
                >
                  Download CSV
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#c5cbe9" }}>
        <Container fluid className="mt-3">
          <Row className="justify-content-center">
            <Col md={12} className="mb-4">
              <div
                className="p-4 rounded shadow"
                style={{
                  backgroundColor: "#3F51B5",
                  color: "white",
                  marginTop: "50px",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Montserrat', serif",
                    fontSize: "20px",
                  }}
                >
                  Export Vehicle Data File
                </h4>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Form.Group controlId="formAge" className="mb-3">
                    <Form.Label style={{ fontSize: "14px" ,fontFamily: "'Montserrat', serif",}}>
                      Vehicle Age
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Vehicle Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      style={{ fontSize: "14px" ,fontFamily: "'Montserrat', serif"}}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button
                      type="button"
                      onClick={handleExport}
                      style={{
                        backgroundColor: "#283593",
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "'Montserrat', serif"
                      }}
                    >
                      Export File
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

export default ExportVehiclesPage;
