import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Account() {
  const token = localStorage.getItem("token");

  return (
    <div id="wd-account-screen">
      <Routes>
        <Route
          path=""
          element={token ? <Profile /> : <Navigate to="/LoveIsland/Account/Signin" replace />}
        />
        <Route path="Signin" element={<Signin />} />
        <Route path="Signup" element={<Signup />} />
        <Route
          path="Profile"
          element={token ? <Profile /> : <Navigate to="/LoveIsland/Account/Signin" replace />}
        />
        <Route path="*" element={<Navigate to="/LoveIsland/Account/Signin" replace />} />
      </Routes>
    </div>
  );
}