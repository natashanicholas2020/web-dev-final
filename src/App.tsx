// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoveIsland from "./LoveIsland";
import Signin from "./LoveIsland/Account/Signin";
import Home from "./LoveIsland/Home";
import Navigation from "./LoveIsland/Navigation";
import Logo from "./LoveIsland/Logo"; 

export default function App() {
  return (
    <BrowserRouter>
      <Logo />
      <Navigation />
      <div className="wd-content">
        <Routes>
          <Route path="/" element={<LoveIsland />} />
          <Route path="/LoveIsland/Home" element={<Home />} />
          <Route path="/LoveIsland/Account/Signin" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
