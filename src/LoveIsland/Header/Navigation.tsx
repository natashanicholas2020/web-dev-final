// navigation.tsx
import { Link } from "react-router-dom";
import "./styles.css"; // Optional: for styling

export default function Navigation() {
  return (
    <nav className="wd-navbar">
      <Link to="/LoveIsland/Home" className="wd-nav-link">Home</Link>
      <Link to="/LoveIsland/Account" className="wd-nav-link">Account</Link>
      <Link to="/LoveIsland/Islanders" className="wd-nav-link">Islanders</Link>
      <Link to="/LoveIsland/Community" className="wd-nav-link">Community</Link>
      <Link to="/LoveIsland/Search" className="wd-nav-link">Search</Link>
    </nav>
  );
}
