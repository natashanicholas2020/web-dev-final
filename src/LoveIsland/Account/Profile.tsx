// import { Link } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";

// export default function Profile() {
//   return (
//     <div id="wd-profile-screen" className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h1 className="text-center mb-4">Profile</h1>

//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-username"
//                 type="text"
//                 defaultValue="alice"
//                 placeholder="Username"
//                 className="form-control-lg"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-password"
//                 type="password"
//                 defaultValue="123"
//                 placeholder="Password"
//                 className="form-control-lg"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-firstname"
//                 type="text"
//                 defaultValue="Alice"
//                 placeholder="First Name"
//                 className="form-control-lg"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-lastname"
//                 type="text"
//                 defaultValue="Wonderland"
//                 placeholder="Last Name"
//                 className="form-control-lg"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-dob"
//                 type="date"
//                 defaultValue="2000-01-01"
//                 className="form-control-lg"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-email"
//                 type="email"
//                 defaultValue="alice@wonderland"
//                 placeholder="Email"
//                 className="form-control-lg"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Select
//                 id="wd-role"
//                 defaultValue="FACULTY"
//                 className="form-control-lg"
//               >
//                 <option value="USER">User</option>
//                 <option value="ADMIN">Admin</option>
//                 <option value="FACULTY">Faculty</option>
//                 <option value="STUDENT">Student</option>
//               </Form.Select>
//             </Form.Group>

//             <div className="d-flex justify-content-between">
//               <Link to="/LoveIsland/Account/Signin">
//                 <Button variant="danger" className="w-100">
//                   Sign out
//                 </Button>
//               </Link>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string; // ISO date string
  role: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/LoveIsland/Account/Signin");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          navigate("/LoveIsland/Account/Signin");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/LoveIsland/Account/Signin");
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="container py-5">
        {error}
      </Alert>
    );

  if (!user) return null;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div id="wd-profile-screen" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Profile</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-username"
                type="text"
                value={user.username}
                placeholder="Username"
                className="form-control-lg"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-firstname"
                type="text"
                value={user.firstName || ""}
                placeholder="First Name"
                className="form-control-lg"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-lastname"
                type="text"
                value={user.lastName || ""}
                placeholder="Last Name"
                className="form-control-lg"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-dob"
                type="date"
                value={user.dob ? user.dob.substring(0, 10) : ""}
                className="form-control-lg"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-email"
                type="email"
                value={user.email || ""}
                placeholder="Email"
                className="form-control-lg"
                readOnly
              />
            </Form.Group>

            {/* Display role as plain read-only text */}
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-role"
                type="text"
                value={user.role}
                className="form-control-lg"
                readOnly
              />
            </Form.Group>

            <Button
              variant="danger"
              className="w-100"
              onClick={handleSignOut}
              id="wd-signout-btn"
            >
              Sign out
            </Button>
          </Form>
        </div>
      </div>
    </div>
    </div>
  );
}