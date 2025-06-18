import { Link } from "react-router-dom";

export default function Signin({ onSignIn }: { onSignIn: () => void }) {
  return (
    <>
      <div className="wd-background-layer" />
      <div id="wd-signin-screen" className="wd-content-layer">
        <h3>Sign in</h3>
        <input placeholder="username" className="wd-username" /> <br />
        <input placeholder="password" type="password" className="wd-password" /> <br />
        <button onClick={onSignIn} id="wd-signin-btn">Sign in</button> <br />
        <Link to="/LoveIsland/Account/Signup" id="wd-signup-link">Sign up</Link>
      </div>
    </>
  );
}
