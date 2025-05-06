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
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px" }} className="p-4 shadow">
                <h3 className="text-center">Login</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter password" required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">Login</Button>
                </Form>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </Card>
        </Container>
    );
};

export default Login;
