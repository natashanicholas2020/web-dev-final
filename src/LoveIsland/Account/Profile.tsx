import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Profile</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-username"
                type="text"
                defaultValue="alice"
                placeholder="Username"
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-password"
                type="password"
                defaultValue="123"
                placeholder="Password"
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-firstname"
                type="text"
                defaultValue="Alice"
                placeholder="First Name"
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-lastname"
                type="text"
                defaultValue="Wonderland"
                placeholder="Last Name"
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-dob"
                type="date"
                defaultValue="2000-01-01"
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-email"
                type="email"
                defaultValue="alice@wonderland"
                placeholder="Email"
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                id="wd-role"
                defaultValue="FACULTY"
                className="form-control-lg"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Link to="/LoveIsland/Account/Signin">
                <Button variant="danger" className="w-100">
                  Sign out
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}