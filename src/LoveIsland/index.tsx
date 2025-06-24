import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Account from "./Account";
import Home from "./Home";
import Community from "./Community";
import Islanders from "./Islanders";
import IslanderDetails from "./Islanders/IslanderDetails";
import Header from "./Header";
import Search from "./Search";
import Details from "./Search/Details";
import ReplyPage from "./Community/Reply";  // <-- Import ReplyPage component

import './styles.css';

export default function LoveIsland() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        
        <div className="wd-content-container">
          <Routes>
            {/* Redirect root "/" to "/LoveIsland/Home" */}
            <Route path="/" element={<Navigate to="/LoveIsland/Home" replace />} />

            {/* Redirect "/LoveIsland/" to "/LoveIsland/Home" */}
            <Route path="/LoveIsland/" element={<Navigate to="/LoveIsland/Home" replace />} />

            <Route path="/LoveIsland/Home" element={<Home />} />
            <Route path="/LoveIsland/Account/*" element={<Account />} />

            {/* Community main page */}
            <Route path="/LoveIsland/Community" element={<Community />} />

            {/* Reply page for posts */}
            <Route path="/LoveIsland/Community/reply/:postId" element={<ReplyPage />} />

            <Route path="/LoveIsland/Islanders" element={<Islanders />} />
            <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} />
            <Route path="/LoveIsland/Search" element={<Search />} />
            <Route path="/LoveIsland/Details/:id" element={<Details />} />

            {/* Catch all */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
