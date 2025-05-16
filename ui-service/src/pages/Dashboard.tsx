import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoNotifications } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Navigation } from "../components/Navigation";
import type { AppDispatch, RootState } from "../store/store";
import { getAllVehicles } from "../reducers/VehicleSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicles, loading, error, total } = useSelector(
    (state: RootState) => state.vehicle
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [car_make, setCarMake] = useState("");
  const [car_model, setCarModel] = useState("");
  const [vin, setVin] = useState("");
  const [manufactured_date, setManufacturedDate] = useState("");
  const [age_of_vehicle, setAgeOfVehicle] = useState("");

  useEffect(() => {
    dispatch(getAllVehicles(page));
  }, [dispatch, page]);

  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setFirstName(vehicle.first_name);
    setLastName(vehicle.last_name);
    setEmail(vehicle.email);
    setCarMake(vehicle.car_make);
    setCarModel(vehicle.car_model);
    setVin(vehicle.vin);
    setManufacturedDate(vehicle.manufactured_date);
    setAgeOfVehicle(vehicle.age_of_vehicle);
    setShowModal(true);
  };

  const handleUpdateVehicle = () => {
    const updatedVehicle = {
      ...selectedVehicle,
      first_name,
      last_name,
      email,
      car_make,
      car_model,
      vin,
      manufactured_date,
      age_of_vehicle,
    };

    console.log("Updated vehicle data:", updatedVehicle);

    // TODO: Dispatch update action here
    // dispatch(updateVehicle(updatedVehicle));

    setShowModal(false);
  };

  const filteredVehicles = vehicles.filter((vehicle: any) =>
    vehicle.car_make?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full h-full overflow-hidden">
      <Navigation />
      <div className="flex-1 p-5" style={{ backgroundColor: "#c5cbe9" }}>
        <Container fluid>
          <Row className="align-items-center mb-3">
            <Col md={12}>
              <div
                className="p-3 rounded"
                style={{ backgroundColor: "#9fa8da", marginTop: "40px" }}
              >
                <Row className="align-items-center">
                  <Col md={6}>
                    <InputGroup>
                      <FormControl
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                      />
                      <InputGroup.Text>
                        <MdSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex justify-content-end gap-3">
                      <FaUserCircle size={28} />
                      <IoNotifications size={28} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <h4 className="mb-4" style={{ color: "darkblue", fontWeight: "bold" }}>
            Vehicle Records
          </h4>

          <div className="table-responsive">
            <Table striped bordered hover responsive className="text-center">
              <thead className="bg-danger text-white">
                <tr>
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
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10}>Loading...</td>
                  </tr>
                ) : filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={10}>No vehicle data to display.</td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle: any) => (
                    <tr key={vehicle.id}>
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
                            onClick={() =>
                              console.log("Delete clicked:", vehicle.id)
                            }
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

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="secondary"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span>
              Page {page} of {Math.ceil(total / itemsPerPage)}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= Math.ceil(total / itemsPerPage)}
              onClick={() =>
                setPage((prev) =>
                  prev < Math.ceil(total / itemsPerPage) ? prev + 1 : prev
                )
              }
            >
              Next
            </Button>
          </div>
        </Container>

        {/* Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Vehicle Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

                    const manufactureYear = new Date(selectedDate).getFullYear();
                    const currentYear = new Date().getFullYear();
                    const age = currentYear - manufactureYear;
                    setAgeOfVehicle(age.toString());
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age Of Vehicle</Form.Label>
                <Form.Control type="text" value={age_of_vehicle} readOnly />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateVehicle}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
