import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

type FormState = {
  username: string;
  password: string;
  passwordVerify: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
};

export default function Signup() {
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    passwordVerify: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.passwordVerify) {
      setError("Passwords do not match");
      return;
    }

    if (!form.role) {
      setError("Please select a role");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          dob: form.dob,
          role: form.role,
        }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        setError(errorMsg || "Failed to sign up");
        setLoading(false);
        return;
      }

      // Signup successful - redirect to signin
      setLoading(false);
      navigate("/LoveIsland/Account/Signin");
    } catch (err) {
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div id="wd-signup-screen" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center mb-4">Sign up</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-username"
                type="text"
                placeholder="Username"
                className="form-control-lg"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-password"
                type="password"
                placeholder="Password"
                className="form-control-lg"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-password-verify"
                type="password"
                placeholder="Verify Password"
                className="form-control-lg"
                value={form.passwordVerify}
                onChange={(e) => handleChange("passwordVerify", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-firstname"
                type="text"
                placeholder="First Name"
                className="form-control-lg"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-lastname"
                type="text"
                placeholder="Last Name"
                className="form-control-lg"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-email"
                type="email"
                placeholder="Email"
                className="form-control-lg"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-dob"
                type="date"
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                id="wd-role"
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                required
              >
                <option value="">Select a role</option>
                <option value="Islander">Islander</option>
                <option value="Producer">Producer</option>
                <option value="Public">Public</option>
              </Form.Select>
            </Form.Group>

            <Button
              id="wd-signup-btn"
              variant="primary"
              size="lg"
              className="w-100 mb-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Sign up"}
            </Button>
          </Form>

          <div className="text-center">
            <Link id="wd-signin-link" to="/LoveIsland/Account/Signin">
              Already have an account? Sign in here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
