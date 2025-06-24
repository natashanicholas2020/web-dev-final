// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Spinner, Alert } from "react-bootstrap";

// type User = {
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   dob: string; // ISO date string
//   role: string;
// };

// export default function Profile() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/LoveIsland/Account/Signin");
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:4000/api/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.status === 401 || res.status === 403) {
//           localStorage.removeItem("token");
//           navigate("/LoveIsland/Account/Signin");
//           return;
//         }

//         if (!res.ok) {
//           throw new Error("Failed to fetch profile");
//         }

//         const data = await res.json();
//         setUser(data);
//       } catch (err) {
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     navigate("/LoveIsland/Account/Signin");
//   };

//   if (loading)
//     return (
//       <div className="text-center py-5">
//         <Spinner animation="border" />
//       </div>
//     );

//   if (error)
//     return (
//       <Alert variant="danger" className="container py-5">
//         {error}
//       </Alert>
//     );

//   if (!user) return null;

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100">
//     <div id="wd-profile-screen" className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h1 className="text-center mb-4">Profile</h1>

//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-username"
//                 type="text"
//                 value={user.username}
//                 placeholder="Username"
//                 className="form-control-lg"
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-firstname"
//                 type="text"
//                 value={user.firstName || ""}
//                 placeholder="First Name"
//                 className="form-control-lg"
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-lastname"
//                 type="text"
//                 value={user.lastName || ""}
//                 placeholder="Last Name"
//                 className="form-control-lg"
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-dob"
//                 type="date"
//                 value={user.dob ? user.dob.substring(0, 10) : ""}
//                 className="form-control-lg"
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-email"
//                 type="email"
//                 value={user.email || ""}
//                 placeholder="Email"
//                 className="form-control-lg"
//                 readOnly
//               />
//             </Form.Group>

//             {/* Display role as plain read-only text */}
//             <Form.Group className="mb-3">
//               <Form.Control
//                 id="wd-role"
//                 type="text"
//                 value={user.role}
//                 className="form-control-lg"
//                 readOnly
//               />
//             </Form.Group>

//             <Button
//               variant="danger"
//               className="w-100"
//               onClick={handleSignOut}
//               id="wd-signout-btn"
//             >
//               Sign out
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
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
  dob: string;
  role: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data);
      } catch {
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (field: keyof User, value: string) => {
    if (user) {
      setUser({ ...user, [field]: value });
    }
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token || !user) return;
  
    try {
      const res = await fetch("http://localhost:4000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dob: user.dob,
        }),
      });
  
      if (!res.ok) throw new Error("Failed to update profile");
  
      const updated = await res.json();
      setUser(updated);
      setSuccess("Profile updated successfully!");
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  };
  

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

            {success && <Alert variant="success">{success}</Alert>}

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  id="wd-username"
                  type="text"
                  value={user.username}
                  readOnly
                  className="form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  id="wd-firstname"
                  type="text"
                  value={user.firstName}
                  placeholder="First Name"
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  id="wd-lastname"
                  type="text"
                  value={user.lastName}
                  placeholder="Last Name"
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  id="wd-dob"
                  type="date"
                  value={user.dob?.substring(0, 10)}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  id="wd-email"
                  type="email"
                  value={user.email}
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  id="wd-role"
                  type="text"
                  value={user.role}
                  readOnly
                  className="form-control-lg"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleUpdate}>
                  Update Profile
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleSignOut}
                  id="wd-signout-btn"
                >
                  Sign Out
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
