import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/LoveIsland/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
);}