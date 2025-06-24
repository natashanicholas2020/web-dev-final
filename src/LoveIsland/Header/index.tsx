import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";  // Adjust path if needed
import { Link } from "react-router-dom";
import "./styles.css";  // Your existing CSS file, with the styles you shared

export default function Header() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`wd-title-bar ${sticky ? "scroll-away" : ""}`}>
        <img src={logo} alt="Love Island Logo" className="wd-logo-image" />
      </div>

      <nav className={`wd-navbar ${sticky ? "sticky" : ""}`}>
        <Link to="/LoveIsland/Home" className="wd-nav-link">Home</Link>
        <Link to="/LoveIsland/Account" className="wd-nav-link">Account</Link>
        <Link to="/LoveIsland/Islanders" className="wd-nav-link">Islanders</Link>
        <Link to="/LoveIsland/Community" className="wd-nav-link">Community</Link>
        <Link to="/LoveIsland/Search" className="wd-nav-link">Search</Link>
      </nav>
    </>
  );
}
