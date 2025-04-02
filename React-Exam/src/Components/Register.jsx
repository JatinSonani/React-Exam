import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync } from "../Service/action/authAction";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Login.css"; // Using the same movie theme CSS

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreated, error } = useSelector((state) => state.userReducer);

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAsync(inputData));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated, navigate]);

  return (
    <div className="login-page"> {/* Reusing movie theme styles */}
      <Container className="login-container">
        <h2 className="movie-title">🍿 Join MovieFlix Today!</h2>

        {error && <p className="error-message">❌ {error}</p>}

        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">
              🎟 Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleChanged}
                placeholder="Enter Email"
                required
                className="ticket-input"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2" className="form-label">
              🔑 Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleChanged}
                placeholder="Enter Password"
                required
                className="ticket-input"
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="warning" className="btn-signup">
            🎬 Sign Up
          </Button>
        </Form>

        <p className="register-link">
          🔐 Already have an account? <Link to="/signin">Login Here</Link>
        </p>
      </Container>
    </div>
  );
};

export default Register;
