// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";

// //import LoveIsland from "./LoveIsland";
// import Signin from "./LoveIsland/Account/Signin";
// import Signup from "./LoveIsland/Account/Signup";
// import Profile from "./LoveIsland/Account/Profile";
// import Home from "./LoveIsland/Home";
// import Community from "./LoveIsland/Community";
// import Islanders from "./LoveIsland/Islanders";
// import Navigation from "./LoveIsland/Navigation";
// import Logo from "./LoveIsland/Logo";
// import IslanderDetails from "./LoveIsland/Islanders/IslanderDetails"; // Adjust path if needed


// export default function App() {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   return (
//     <BrowserRouter>
//       <div className="wd-blue-bg"> {/* ✅ Blue background applied here */}
//         <Logo />
//         <Navigation />
//         <div className="wd-content">
//           <Routes>
//             <Route path="/" element={<Navigate to="/LoveIsland/Home" replace />} />
//             <Route path="/LoveIsland/Home" element={<Home />} />
//             <Route
//               path="/LoveIsland/Account/*"
//               element={
//                 <Signin
//                 />
//               }
//             />
//             <Route path="/LoveIsland/Community" element={<Community />} />
//             <Route path="/LoveIsland/Islanders" element={<Islanders />} />
//             <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} />
//             <Route path="*" element={<div>Page not found</div>} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Account from "./LoveIsland/Account";  // Import the Account component (with nested routes)
import Home from "./LoveIsland/Home";
import Community from "./LoveIsland/Community";
import Islanders from "./LoveIsland/Islanders";
import Navigation from "./LoveIsland/Navigation";
import Logo from "./LoveIsland/Logo";
import IslanderDetails from "./LoveIsland/Islanders/IslanderDetails"; // Adjust path if needed

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="wd-blue-bg">
        <Logo />
        <Navigation />
        <div className="wd-content">
          <Routes>
            <Route path="/" element={<Navigate to="/LoveIsland/Home" replace />} />
            <Route path="/LoveIsland/Home" element={<Home />} />

            {/* Mount Account component that handles Signin, Signup, Profile routes */}
            <Route path="/LoveIsland/Account/*" element={<Account />} />

            <Route path="/LoveIsland/Community" element={<Community />} />
            <Route path="/LoveIsland/Islanders" element={<Islanders />} />
            <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} />

            {/* Fallback route for unknown paths */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

