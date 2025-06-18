import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

//import LoveIsland from "./LoveIsland";
import Signin from "./LoveIsland/Account/Signin";
import Signup from "./LoveIsland/Account/Signup";
import Profile from "./LoveIsland/Account/Profile";
import Home from "./LoveIsland/Home";
import Community from "./LoveIsland/Community";
import Islanders from "./LoveIsland/Islanders";
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
  <Route path="/" element={<Navigate to="/LoveIsland/Home" replace />} />
  <Route path="/LoveIsland/Home" element={<Home />} />
  <Route
    path="/LoveIsland/Account/*"
    element={
      <AccountRoutes
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
    }
  />
<Route path="/LoveIsland/Community" element={<Community />} />
<Route path="/LoveIsland/Islanders" element={<Islanders />} />

</Routes>

      </div>
    </BrowserRouter>
  );
}

function AccountRoutes({
  isSignedIn,
  //setIsSignedIn,
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
      <Route path="Signin" element={<Signin />} />
      <Route path="Signup" element={<Signup />} />
      <Route
        path="Profile"
        element={isSignedIn ? <Profile /> : <Navigate to="Signin" replace />}
      />
    </Routes>
  );
}


// import Labs from "./Labs";
// import Kambaz from "./Kambaz";
// import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
// export default function App() {
//   return (
//     <HashRouter>
//       <div>
//       <Routes>
//       <Route path="/" element={<Navigate to="Kambaz"/>}/>
//      <Route path="/Labs/*" element={<Labs />} />
//      <Route path="/Kambaz/*" element={<Kambaz />} />
//         </Routes>
//       </div>
//     </HashRouter>
// );}
