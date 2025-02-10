import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { signInWithGoogle } from "../firebaseConfig";
import { toast } from "react-toastify";

const LandingPage = () => {
  useEffect(() => {
    const loggedOut = localStorage.getItem("loggedOut");
    const redirected = localStorage.getItem("redirected");

    if (loggedOut === "true") {
      toast.info("You have been logged out.", {
        toastId: "logout-info",
      });
      localStorage.removeItem("loggedOut"); // Clear flag after showing toast
    } else if (redirected === "true") {
      toast.warn("You need to log in to access that page!", {
        toastId: "auth-warning",
      });
      localStorage.removeItem("redirected"); // Clear flag after showing toast
    }
  }, []);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      navigate("/home"); // Redirect after login
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-3">Welcome to Discography</h1>
      <p className="lead">
        Discover photos, albums and user collections all in one place.
      </p>
      <Button variant="primary" size="lg" onClick={handleLogin}>
        Login with Google
      </Button>
    </Container>
  );
};

export default LandingPage;
