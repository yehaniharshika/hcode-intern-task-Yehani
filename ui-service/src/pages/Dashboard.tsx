import {
  Button,
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
import {
  deleteVehicle,
  getAllVehicles,
  updateVehicle,
} from "../reducers/VehicleSlice";
import Swal from "sweetalert2";
import "../pages/style/alert.css";

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

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicles, loading, total } = useSelector(
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

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
    setValidationErrors({}); // Clear previous validation errors
    setShowModal(true);
  };

  const handleDeleteVehicle = (id: string) => {
    Swal.fire({
      title: "⚠️ Are you sure?",
      html: '<p class="swal-text">Do you really want to delete this Vehicle?</p>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
      background: "white",
      color: "black",
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      width: "450px",
      customClass: {
        title: "swal-title",
        popup: "swal-popup",
        confirmButton: "swal-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteVehicle(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "✅ Deleted!",
              html: '<p class="swal-text">Successfully deleted Vehicle.</p>',
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
          })
          .catch((error) => {
            Swal.fire({
              title: "❌ Error!",
              html: '<p class="swal-text">Failed to delete Vehicle.</p>',
              icon: "error",
              confirmButtonText: "OK",
              background: "white",
              color: "black",
              confirmButtonColor: "red",
              timer: 3000,
              width: "450px",
              customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button",
              },
            });
            console.error("Delete failed:", error);
          });
      }
    });
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

  const handleUpdateVehicle = () => {
    if (!selectedVehicle?.id) return;

    // Add validation check before updating
    if (!validateForm()) {
      return; // Stop execution if validation fails
    }

    const updatedVehicle = {
      id: selectedVehicle.id,
      first_name,
      last_name,
      email,
      car_make,
      car_model,
      vin,
      manufactured_date,
      age_of_vehicle,
    };
    
    dispatch(updateVehicle(updatedVehicle))
      .unwrap()
      .then(() => {
        setShowModal(false);
        setSelectedVehicle(null);
        setValidationErrors({}); // Clear validation errors on success
        Swal.fire({
          title: "✅ Success!",
          html: '<p class="swal-text">Vehicle updated successfully.</p>',
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
      })
      .catch((err) => {
        Swal.fire({
          title: "❌ Error!",
          html: '<p class="swal-text">Failed to update Vehicle.</p>',
          icon: "error",
          confirmButtonText: "OK",
          background: "white",
          color: "black",
          confirmButtonColor: "red",
          timer: 3000,
          width: "420px",
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
            confirmButton: "swal-button",
          },
        });
        console.error("Failed to update vehicle:", err);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setValidationErrors({}); // Clear validation errors when closing modal
  };

  const filteredVehicles = vehicles.filter((vehicle: any) =>
    vehicle.car_model?.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <InputGroup
                      style={{
                        border: "2px solid gray",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <FormControl
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search.."
                        style={{
                          fontFamily: "'Montserrat', serif",
                          fontSize: "14px",
                          border: "none",
                          boxShadow: "none",
                          color: "black",
                        }}
                      />
                      <InputGroup.Text
                        style={{
                          backgroundColor: "#fff",
                          border: "none",
                        }}
                      >
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

          <h4
            className="mb-4"
            style={{
              color: "darkblue",
              fontWeight: "bold",
              fontFamily: "'Montserrat', serif",
              fontSize: "20px",
              marginTop: "30px",
            }}
          >
            Vehicle Records
          </h4>

          <div
            className="table-responsive"
            style={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <Table
              striped
              bordered
              hover
              responsive
              className="text-center"
              style={{ minHeight: "600px" }}
            >
              <thead className="bg-danger text-white">
                <tr
                  style={{
                    fontFamily: "'Montserrat', serif",
                    fontSize: "14px",
                  }}
                >
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
                }}
              >
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
                            style={{
                              fontFamily: "'Montserrat', serif",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            style={{
                              fontFamily: "'Montserrat', serif",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
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
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Previous
            </Button>
            <span
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
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
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "14px",
              }}
            >
              Next
            </Button>
          </div>
        </Container>

        {/* Edit Modal */}
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontFamily: "'Montserrat', serif",
                color: "darkblue",
                fontWeight: "600",
              }}
            >
              Edit Vehicle Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  className={validationErrors.first_name ? "is-invalid" : ""}
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
                      className={validationErrors.car_make ? "is-invalid" : ""}
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
                      className={validationErrors.car_model ? "is-invalid" : ""}
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "14px",
                fontWeight: "600",
              }}
              variant="secondary"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "14px",
                fontWeight: "600",
              }}
              variant="primary"
              onClick={handleUpdateVehicle}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;