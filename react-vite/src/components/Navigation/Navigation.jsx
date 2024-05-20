import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DarkSiteLogo from "../../../public/hamberderDarkLogo.png";
function Navigation() {
  let navigate = useNavigate();
  return (
    <nav id="sitenav">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <img
          onClick={() => navigate("/")}
          src={DarkSiteLogo}
          alt="Site Dark Logo"
          id="sitelogo"
        />
        <NavLink id="home-navlink" to="/">
          {" "}
          WuberEats
        </NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
