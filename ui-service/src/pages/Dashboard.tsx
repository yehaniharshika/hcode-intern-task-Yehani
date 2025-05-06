import {
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { color, motion } from "framer-motion";
import { FiBell, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { SiGooglemessages } from "react-icons/si";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const vehicleData = [
    { id: "V001", name: "Toyota Prius", type: "Hybrid", image: "car1.png" },
    { id: "V002", name: "Honda Civic", type: "Sedan", image: "car2.png" },
    { id: "V003", name: "Ford F-150", type: "Truck", image: "car3.png" },
    { id: "V004", name: "Tesla Model 3", type: "Electric", image: "car4.png" },
  ];

  const filteredVehicles = vehicleData.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full h-full overflow-hidden">
      <Navigation />
      <div className="flex-1 p-5" style={{ backgroundColor: "#b78fa8" }}>
        <Container fluid>
          <Row className="align-items-center mb-3">
            <Col md={12}>
              <div
                className="p-3 rounded top-50"
                style={{ backgroundColor: "#8854d0" }}
              >
                <Container fluid>
                  <Row className="align-items-center">
                    {/* Search Field */}
                    <Col md={6}>
                      <InputGroup>
                        <FormControl
                          className="font-bold"
                          style={{
                            fontFamily: "'Montserrat', serif",
                            fontSize: "15px",
                          }}
                          placeholder="Search..."
                        />
                        <InputGroup.Text>
                          <MdSearch />
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-end align-items-center gap-3">
                        
                        <FiUser size={32} />
                        <FiBell size={32} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>

          {/* Vehicle Cards Section */}
          <Container fluid className="mt-4">
            <Row className="g-4">
              {filteredVehicles.map((vehicle, idx) => (
                <Col xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Card
                      className="h-100 shadow-lg border-0"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "15px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={`/src/assets/images/${vehicle.image}`}
                        style={{
                          borderTopLeftRadius: "15px",
                          borderTopRightRadius: "15px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: "600",
                          }}
                        >
                          {vehicle.name}
                        </Card.Title>
                        <Card.Text
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Type: {vehicle.type}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
