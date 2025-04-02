import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync, loginWithGoogle } from "../Service/action/authAction";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import "./Login.css"; // Import a CSS file for the movie theme

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userReducer);

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
    dispatch(loginUserAsync(inputData));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login-page">
      <Container className="login-container">
        <h2 className="movie-title">🎬 Welcome Back to MovieFlix!</h2>
        {error ? <p className="error-message">❌ {error}</p> : ""}

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

          <Button type="submit" variant="warning" className="btn-signin">
            🎥 Sign In
          </Button>
        </Form>
        <br />
        <Button variant="danger" onClick={handleGoogleLogin} className="btn-google">
          <FaGoogle className="google-icon" />   Login with Google
        </Button>

        <p className="register-link">
          🆕 Create a new account? <Link to="/signup">Register Now</Link>
        </p>
      </Container>
    </div>
  );
};

export default Login;
