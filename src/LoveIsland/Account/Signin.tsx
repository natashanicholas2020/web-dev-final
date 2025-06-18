import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1 className="text-center mb-4">Sign in</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-username"
                type="text"
                placeholder="Username"
                className="form-control-lg"
                defaultValue="jdoe"
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

            <Button
              id="wd-signin-btn"
              as="a"
              href="/LoveIsland/Account/Profile"
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
    </div>
  );
}