import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "../components/Navigation";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { exportVehicles } from "../reducers/VehicleSlice";
import type { AppDispatch } from "../store/store";
import Swal from "sweetalert2";


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
    const resultAction = await dispatch(exportVehicles(Number(age)));

    if (exportVehicles.fulfilled.match(resultAction)) {
      const { success, fileUrl } = resultAction.payload;

      if (success && fileUrl) {
        // Automatically download the file
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "vehicles.csv";
        link.click();

        Swal.fire("Success", "File downloaded successfully!", "success");
      } else {
        Swal.fire("Warning", "Export was not successful", "warning");
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to export file", "error");
  }
};


  // const handleView = () => {
  //   if (Array.isArray(exportedData) && exportedData.length > 0) {
  //     setShowModal(true);
  //   } else {
  //     Swal.fire("⚠ Warning", "No exported data to view", "warning");
  //   }
  // };

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
                
                
              </div>
            </Form>
          </div>
        </Container>
      </div>

      
    </div>
  );
};

export default ExportVehiclesPage;
