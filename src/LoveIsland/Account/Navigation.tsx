// import { Link } from "react-router-dom";

// export default function AccountNavigation() {
//   return (
//     <div id="wd-account-navigation">
//       <Link to={`/LoveIsland/Account/Signin`}  > Signin  </Link> <br/>
//       <Link to={`/LoveIsland/Account/Signup`}  > Signup  </Link> <br/>
//       <Link to={`/LoveIsland/Account/Profile`} > Profile </Link> <br/>
//     </div>
// );}


import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Navigation() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/LoveIsland/Account/Signin");
  };

  return (
    <div id="wd-account-navigation">
      {!token ? (
        <>
          <Link to="/LoveIsland/Account/Signin"> Signin </Link> <br />
          <Link to="/LoveIsland/Account/Signup"> Signup </Link> <br />
        </>
      ) : (
        <>
          <Link to="/LoveIsland/Account/Profile"> Profile </Link> <br />
          <button onClick={handleSignOut} style={{ marginTop: 10 }}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}