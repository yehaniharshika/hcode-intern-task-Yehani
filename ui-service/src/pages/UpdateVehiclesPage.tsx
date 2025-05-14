import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Table, Button, Container } from "react-bootstrap";

const UpdateVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/vehicle") // Replace with actual API
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleEditVehicle = (vehicle: any) => {
    console.log("Edit clicked for:", vehicle);
    // Add modal or routing logic
  };

  const handleDeleteVehicle = (event: React.MouseEvent, vehicleId: number) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      fetch(`http://localhost:8081/vehicle/${vehicleId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setVehicles((prev) => prev.filter((v: any) => v.id !== vehicleId));
            alert("Vehicle deleted.");
          } else {
            alert("Failed to delete vehicle.");
          }
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  return (
    <div className="d-flex w-100 min-vh-100">
      <Navigation />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#fceef4" }}>
        <Container fluid>
          <h4 className="mb-4" style={{ fontFamily: "'Ubuntu', sans-serif" }}>
            Vehicle Records
          </h4>
          <div className="table-responsive">
            <Table striped bordered hover responsive className="text-center">
              <thead className="bg-danger text-white">
                <tr style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Car Make</th>
                  <th>Car Model</th>
                  <th>VIN</th>
                  <th>Manufactured Date</th>
                  <th>Vehicle Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-muted py-3">
                      No vehicle data to display.
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle: any) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.first_name}</td>
                      <td>{vehicle.last_name}</td>
                      <td>{vehicle.email}</td>
                      <td>{vehicle.car_make}</td>
                      <td>{vehicle.car_model}</td>
                      <td>{vehicle.vin}</td>
                      <td>{vehicle.manufactured_date}</td>
                      <td>{vehicle.age_of_vehicle}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEditVehicle(vehicle)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => handleDeleteVehicle(e, vehicle.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UpdateVehiclesPage;
