import { API_BASE_URL } from "../../config/api";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

export default function Signin() {
  const [username, setUsername] = useState("jdoe");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      localStorage.setItem("username", username);

      navigate("/LoveIsland/Account/Profile");
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div id="wd-signin-screen" className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Sign in</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              id="wd-username"
              type="text"
              placeholder="Username"
              className="form-control-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              id="wd-password"
              type="password"
              placeholder="Password"
              className="form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </Form.Group>

          <Button
            id="wd-signin-btn"
            type="submit"
            variant="primary"
            size="lg"
            className="w-100 mb-3"
          >
            Sign in
          </Button>
        </Form>

        <div className="text-center">
          <Link id="wd-signup-link" to="/LoveIsland/Account/Signup">
            Don't have an account? Sign up here.
          </Link>
        </div>
      </div>
    </div>
  );
}