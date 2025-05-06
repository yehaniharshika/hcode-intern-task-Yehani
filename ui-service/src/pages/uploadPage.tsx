import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Example: POST to your API endpoint
    fetch("http://localhost:8081/your-upload-endpoint", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log("Upload Success:", data);
        alert("File uploaded successfully!");
      })
      .catch(err => {
        console.error("Upload Error:", err);
        alert("Upload failed.");
      });
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      <Navigation />
      <div className="flex-1 p-5" style={{ backgroundColor: "#b78fa8" }}>
        <Container fluid className="mt-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="p-4 rounded shadow" style={{ backgroundColor: "#a97897" }}>
                <h4 className="text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Upload Vehicle Data File
                </h4>
                <Form onSubmit={handleUpload}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="text-white">Choose CSV or Excel File</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} accept=".csv, .xlsx" />
                  </Form.Group>
                  <Button type="submit" variant="dark" style={{ backgroundColor: "#6F1E51" }}>
                    Upload
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UploadPage;
