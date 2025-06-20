// import { Routes, Route, Navigate } from "react-router";
// import Signin from "./Signin";
// import Profile from "./Profile";
// import Signup from "./Signup";

// export default function Account() {
//   return (
//     <div id="wd-account-screen">
//       <Routes>
//         <Route path="/" element={<Navigate to="/LoveIsland/Account/Signin" />} />
//         <Route path="/Signin" element={<Signin />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route path="/Signup" element={<Signup />} />
//       </Routes>
//     </div>
// );}


import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";

export default function Account() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* When at /LoveIsland/Account */}
      <Route
        path="/"
        element={token ? <Profile /> : <Navigate to="/LoveIsland/Account/Signin" replace />}
      />

      {/* Signin page */}
      <Route path="Signin" element={<Signin />} />

      {/* Profile page explicitly */}
      <Route path="Profile" element={token ? <Profile /> : <Navigate to="/LoveIsland/Account/Signin" replace />} />

      {/* You can add other Account related routes here */}
    </Routes>
  );
}
