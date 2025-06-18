import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link to={`/LoveIsland/Account/Signin`}  > Signin  </Link> <br/>
      <Link to={`/LoveIsland/Account/Signup`}  > Signup  </Link> <br/>
      <Link to={`/LoveIsland/Account/Profile`} > Profile </Link> <br/>
    </div>
);}