import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Button,
  Spinner,
  Alert,
  ListGroup,
  InputGroup,
} from "react-bootstrap";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  followers?: string[];
  following?: string[];
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
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

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setSearchLoading(true);
      setSearchError("");

      try {
        const token = localStorage.getItem("token");
        const currentUsername = localStorage.getItem("username");
        if (!token) {
          navigate("/LoveIsland/Account/Signin");
          return;
        }

        const res = await fetch(
          `http://localhost:4000/api/users/search?q=${encodeURIComponent(
            searchTerm
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Search failed");

        let results = await res.json();
        if (currentUsername) {
          results = results.filter(
            (user: User) => user.username !== currentUsername
          );
        }

        setSearchResults(results);
      } catch {
        setSearchError("Failed to search users. Please try again.");
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, navigate]);

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
    <div className="container pt-4">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          <h1 className="mb-4">Profile</h1>

          {/* Search */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search users by username, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="wd-user-search"
            />
            {searchLoading && (
              <InputGroup.Text>
                <Spinner animation="border" size="sm" />
              </InputGroup.Text>
            )}
          </InputGroup>

          {searchError && <Alert variant="danger">{searchError}</Alert>}
          {searchResults.length > 0 && (
            <ListGroup className="mb-4" style={{ maxHeight: 200, overflowY: "auto" }}>
              {searchResults.map((result) => (
                <ListGroup.Item key={result.username}>
                  <Link
                    to={`/LoveIsland/Users/${result.username}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <strong>{result.username}</strong> — {result.firstName}{" "}
                    {result.lastName} ({result.email})
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {success && <Alert variant="success">{success}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="wd-username"
                type="text"
                value={user.username}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-firstname"
                type="text"
                value={user.firstName}
                placeholder="First Name"
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-lastname"
                type="text"
                value={user.lastName}
                placeholder="Last Name"
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-dob"
                type="date"
                value={user.dob?.substring(0, 10)}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="wd-email"
                type="email"
                value={user.email}
                placeholder="Email"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control id="wd-role" type="text" value={user.role} readOnly />
            </Form.Group>

            <Button
              id="wd-save"
              variant="success"
              className="w-100 mb-2"
              onClick={handleUpdate}
            >
              Save Profile
            </Button>
            <Button
              id="wd-signout"
              variant="danger"
              className="w-100"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Form>
        </div>

        <div className="col-md-4 offset-md-1">
          {user.following && user.following.length > 0 && (
            <div className="mb-4">
              <h5>Following</h5>
              <ListGroup>
                {user.following.map((username) => (
                  <ListGroup.Item key={username}>
                    <Link
                      to={`/LoveIsland/Users/${username}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {username}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          {user.followers && user.followers.length > 0 && (
            <div>
              <h5>Followers</h5>
              <ListGroup>
                {user.followers.map((username) => (
                  <ListGroup.Item key={username}>
                    <Link
                      to={`/LoveIsland/Users/${username}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {username}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
