import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync, loginUserAsync, loginWithGoogle, logOutAsync } from "../Servise/action/auth.action";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaGoogle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./MovieTheme.css"; // Applying movie theme styles

const MovieAuth = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isCreated, error } = useSelector((state) => state.userReducer);
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    type === "login" ? dispatch(loginUserAsync(inputData)) : dispatch(registerUserAsync(inputData));
  };

  const handleGoogleLogin = () => dispatch(loginWithGoogle());

  useEffect(() => {
    if (user || isCreated) navigate("/");
  }, [user, isCreated, navigate]);

  return (
    <Container className="movie-auth-container">
      <h2 className="movie-title">{type === "login" ? "🎬 Welcome Back!" : "🌟 Join the Movie Club!"}</h2>
      {error && <p className="error-message">❌ {error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="form-label">Email</Form.Label>
          <Col sm="10">
            <Form.Control type="email" name="email" value={inputData.email} onChange={handleChanged} placeholder="Enter Email" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="form-label">Password</Form.Label>
          <Col sm="10">
            <Form.Control type="password" name="password" value={inputData.password} onChange={handleChanged} placeholder="Enter Password" required />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-movie-action">
          {type === "login" ? <FaSignInAlt /> : <FaUserPlus />} {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </Form>
      <br />
      <Button variant="danger" onClick={handleGoogleLogin} className="btn-google">
        <FaGoogle className="google-icon" /> Sign in with Google
      </Button>
      <p>
        {type === "login" ? "🆕 New here? " : "🔐 Already a member? "}
        <Link to={type === "login" ? "/signup" : "/signin"}>{type === "login" ? "Register Now" : "Login Here"}</Link>
      </p>
    </Container>
  );
};

export default MovieAuth;
