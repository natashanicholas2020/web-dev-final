import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1 className="text-center mb-4">Sign up</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-username"
                type="text"
                placeholder="Username"
                className="form-control-lg"
                defaultValue="nnicho"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-password"
                type="password"
                placeholder="Password"
                className="form-control-lg"
                defaultValue="password123"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-password-verify"
                type="password"
                placeholder="Verify Password"
                className="form-control-lg"
                defaultValue="password123" 
              />
            </Form.Group>

            <Link to="/LoveIsland/Account/Profile">
              <Button
                id="wd-signup-btn"
                variant="primary"
                size="lg"
                className="w-100 mb-3"
              >
                Sign up
              </Button>
            </Link>
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