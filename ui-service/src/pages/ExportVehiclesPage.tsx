import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "../components/Navigation";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { exportVehicles } from "../reducers/VehicleSlice";
import type { AppDispatch } from "../store/store";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";

const ExportVehiclesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [age, setAge] = useState("");
  const [exportedData, setExportedData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const csvRef = useRef<any>(null); // Ref for CSVLink

  const handleExport = async () => {
    if (!age || isNaN(Number(age))) {
      alert("Please enter a valid numeric age.");
      return;
    }

    try {
      const result = await dispatch(exportVehicles(Number(age))).unwrap();
      const data = Array.isArray(result) ? result : result.data ?? [];

      if (!data || data.length === 0) {
        Swal.fire("⚠ Warning", "No vehicle data found", "warning");
        return;
      }

      setExportedData(data);

      // Delay for DOM to update before triggering download
      setTimeout(() => {
        if (csvRef.current) {
          csvRef.current.link.click();
        }
      }, 100);

      setShowModal(true);

      Swal.fire({
        title: "✅ Success!",
        html: '<p class="swal-text">Vehicle exported successfully.</p>',
        icon: "success",
        confirmButtonText: "OK",
        background: "white",
        color: "black",
        confirmButtonColor: "green",
        timer: 3000,
        width: "450px",
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleView = () => {
    if (Array.isArray(exportedData) && exportedData.length > 0) {
      setShowModal(true);
    } else {
      Swal.fire("⚠ Warning", "No exported data to view", "warning");
    }
  };

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
              style={{ fontFamily: "'Montserrat', serif", fontSize: "20px" }}
            >
              Export Vehicle Data File
            </h4>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="formAge" className="mb-3">
                <Form.Label style={{ fontSize: "14px" }}>
                  Vehicle Age
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{ fontSize: "14px" }}
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
                  }}
                >
                  Export File
                </Button>
                <Button
                  type="button"
                  onClick={handleView}
                  disabled={exportedData.length === 0}
                  style={{
                    backgroundColor: "#5C6BC0",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  View
                </Button>
                {/* Hidden CSVLink that will be clicked programmatically */}
                <CSVLink
                  data={exportedData}
                  filename="exported-vehicles.csv"
                  className="d-none"
                  ref={csvRef}
                />
              </div>
            </Form>
          </div>
        </Container>
      </div>

      {/* Modal to view exported data */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Exported Vehicle Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {exportedData.length > 0 ? (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    {Object.keys(exportedData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exportedData.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CSVLink
                data={exportedData}
                filename="exported-vehicles.csv"
                className="btn btn-success mt-3"
              >
                Download CSV
              </CSVLink>
            </>
          ) : (
            <p>No data available</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExportVehiclesPage;
