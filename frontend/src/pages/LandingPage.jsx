import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { signInWithGoogle } from "../firebaseConfig";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-3">Welcome to Discography</h1>
      <p className="lead">
        Discover albums, photos, and user collections all in one place.
      </p>
      <Button variant="primary" size="lg" onClick={handleLogin}>
        Login with Google
      </Button>
    </Container>
  );
};

export default LandingPage;
