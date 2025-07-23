import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registration } from "../action";

function Registration() {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

const handleSubmit = async (e) => {
  e.preventDefault(); // исправлено: было e.prevent.default()

  try {
    await dispatch(registration(username, email, password));
    alert("Registration successful!");
  } catch (error) {
    if (error.response?.status === 409) {
      alert("User with this email or username already exists!");
    } else {
      alert("An error occurred during registration.");
    }
  }
};


  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Registration</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registration
            </Button>
          </Form>
          <Link to={"/login"}>Already have an account?</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
