import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Table, Button } from "react-bootstrap";

const UpdateVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vehicle data
    // fetch("http://localhost:8081/vehicle")
    //   .then((res) => res.json())
    //   .then((data) => setVehicles(data))
    //   .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleEditVehicle = (vehicle: any) => {
    console.log("Edit clicked for:", vehicle);
    // Add redirect or open edit modal here
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
    <div>
      <Navigation />
      <div className="overflow-x-auto overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
        <Table
          striped
          bordered
          hover
          responsive
          className="w-full text-center border border-gray-300"
        >
          <thead className="bg-red-500 text-white">
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
              fontWeight: "400",
            }}
          >
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">
                  No vehicle data to show
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle: any) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-blue-100 transition-all"
                >
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
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        // onClick={() => handleEditVehicle(vehicle)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        // onClick={(event) =>
                          
                        // }
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
    </div>
  );
};

export default UpdateVehiclesPage;
