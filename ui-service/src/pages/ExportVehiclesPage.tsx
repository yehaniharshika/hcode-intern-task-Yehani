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
  const csvRef = useRef<any>(null);

  const handleExport = async () => {
    if (!age || isNaN(Number(age))) {
      Swal.fire("Warning", "Please enter a valid numeric age.", "warning");
      return;
    }

    try {
      await dispatch(exportVehicles(Number(age)));

      Swal.fire("Success", "Exported data retrieved successfully!", "success");
    } catch (error: any) {
      console.error(error);
      Swal.fire("Error", error.message || "Failed to export vehicles", "error");
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

                {exportedData.length > 0 && (
                  <>
                    <Button
                      variant="light"
                      onClick={() => csvRef.current.link.click()}
                      style={{ fontSize: "14px", fontWeight: "600" }}
                    >
                      Download CSV
                    </Button>

                    <CSVLink
                      data={exportedData}
                      filename={`vehicles-age-${age}.csv`}
                      className="d-none"
                      ref={csvRef}
                      target="_blank"
                    />
                  </>
                )}
              </div>
            </Form>
          </div>
        </Container>

        {/* MODAL */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Exported Vehicle Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {exportedData.length > 0 ? (
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    {Object.keys(exportedData[0]).map((key, idx) => (
                      <th key={idx}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exportedData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No data to display.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ExportVehiclesPage;
