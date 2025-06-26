import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Account() {
  const token = localStorage.getItem("token");

  return (
    <div id="wd-account-screen">
      <Routes>
        {/* When at /LoveIsland/Account */}
        <Route
          path=""
          element={token ? <Profile /> : <Navigate to="/LoveIsland/Account/Signin" replace />}
        />

        {/* Signin page */}
        <Route path="Signin" element={<Signin />} />

        {/* Signup page */}
        <Route path="Signup" element={<Signup />} />

        {/* Profile page explicitly */}
        <Route
          path="Profile"
          element={token ? <Profile /> : <Navigate to="/LoveIsland/Account/Signin" replace />}
        />

        {/* Catch all in account section - optional */}
        <Route path="*" element={<Navigate to="/LoveIsland/Account/Signin" replace />} />
      </Routes>
    </div>
  );
}