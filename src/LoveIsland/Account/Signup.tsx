import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div className="wd-background-layer" />
      <div id="wd-signup-screen" className="wd-content-layer">
        <h3>Sign up</h3>
        <form>
          <input placeholder="Username" className="wd-username" /> <br />
          <input placeholder="Email" type="email" className="wd-email" /> <br />
          <input placeholder="Password" type="password" className="wd-password" /> <br />
          <button type="submit" id="wd-signup-btn">Sign up</button> <br />
        </form>
        <Link to="/LoveIsland/Account/Signin" id="wd-signin-link">Already have an account? Sign in</Link>
      </div>
    </>
  );
}
