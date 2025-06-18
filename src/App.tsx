import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import LoveIsland from "./LoveIsland";
import Signin from "./LoveIsland/Account/Signin";
import Signup from "./LoveIsland/Account/Signup";
import Profile from "./LoveIsland/Account/Profile";
import Home from "./LoveIsland/Home";
import Navigation from "./LoveIsland/Navigation";
import Logo from "./LoveIsland/Logo";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <Logo />
      <Navigation />
      <div className="wd-content">
        <Routes>
          <Route path="/" element={<LoveIsland />} />
          <Route path="/LoveIsland/Home" element={<Home />} />

          <Route
            path="/LoveIsland/Account/*"
            element={
              <AccountRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function AccountRoutes({
  isSignedIn,
  setIsSignedIn,
}: {
  isSignedIn: boolean;
  setIsSignedIn: (val: boolean) => void;
}) {
  return (
    <Routes>
      <Route
        path=""
        element={isSignedIn ? <Profile /> : <Navigate to="Signin" replace />}
      />
      <Route path="Signin" element={<Signin onSignIn={() => setIsSignedIn(true)} />} />
      <Route path="Signup" element={<Signup />} />
      <Route
        path="Profile"
        element={isSignedIn ? <Profile /> : <Navigate to="Signin" replace />}
      />
    </Routes>
  );
}


// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Signin from './LoveIsland/Account/Signin';
// import Signup from './LoveIsland/Account/Signup';
// import Profile from './LoveIsland/Account/Profile';
// import Navigation from './LoveIsland/Navigation';
// import Home from './LoveIsland/Home'

// import { useState } from 'react';

// export default function AppRoutes() {
//   // Simple user auth state (replace with real auth logic)
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   return (
//     <Router>
//       <Navigation />

//       <Routes>
//       <Route path="/LoveIsland/Home" element={<Home />} /> {/* your home or main page */}

//         {/* Nested Account routes */}
//         <Route path="/LoveIsland/Account/*" element={<AccountRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />

//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// }

// function AccountRoutes({ isSignedIn, setIsSignedIn }: { isSignedIn: boolean; setIsSignedIn: (val: boolean) => void }) {
//   return (
//     <Routes>
//       {/* If signed in, show profile when navigating to /Account */}
//       <Route
//         path=""
//         element={isSignedIn ? <Profile /> : <Navigate to="Signin" replace />}
//       />
//       <Route path="Signin" element={<Signin onSignIn={() => setIsSignedIn(true)} />} />
//       <Route path="Signup" element={<Signup />} />
//       <Route path="Profile" element={isSignedIn ? <Profile /> : <Navigate to="Signin" replace />} />
//     </Routes>
//   );
// }
