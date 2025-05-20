import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Login Data:", formData);
      // Simulate authentication (Replace this with actual API call)
      if (formData.email === "admin@gmail.com" && formData.password === "123") {
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert("Invalid email or password");
      }
    }
    setValidated(true);
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/src/assets/img/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(63, 81, 181, 0.6)",
          }}
        ></div>
      </div>

      <Container className="d-flex justify-content-center align-items-center h-100 position-relative">
        <Card
          className="p-4 shadow-lg"
          style={{
            width: "28rem",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(63, 81, 181, 0.3)",
            zIndex: 2,
            borderRadius: "15px",
          }}
        >
          <div
            className="py-4 flex justify-center items-center border-b border-gray-300"
            style={{
              fontFamily: "'Lilita One', sans-serif",
              fontSize: "24px",
              color: "white",
            }}
          >
            🚗Vehicore
          </div>

          <h2
            className="text-center text-white mt-3 mb-4"
            style={{ fontFamily: "'Montserrat', serif", fontWeight: "bold" }}
          >
            Login
          </h2>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  color: "white",
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  color: "white",
                }}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                variant="dark"
                type="submit"
                style={{
                  fontFamily: "'Montserrat', serif",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "120px",
                }}
              >
                Login
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4">
            <span
              className="text-white"
              style={{
                fontFamily: "'Montserrat', serif",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "darkblue",
                  fontWeight: "bold",
                }}
              >
                Signup
              </Link>
            </span>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
