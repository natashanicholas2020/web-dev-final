import "./styles.css";
import logo from "./logo.png"
// import logo from "../assets/logo.png"; 

export default function Logo() {
    return (
      <div className="wd-title-bar">
        <img src={logo} alt="Love Island Logo" className="wd-logo-image" />
      </div>
    );
  }
