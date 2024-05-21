import { NavLink, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DarkSiteLogo from "../../../public/hamberderDarkLogo.png";
import magnifyingglasssolid from "../../../public/magnifying-glass-solid.png";
import { useSelector } from "react-redux";
function Navigation() {
  let navigate = useNavigate();
  let user = useSelector((state) => state.session.user);
  // console.log(user);
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
      </div>{ user &&
      <div id="address-box">
        {user?.address} • Now
        <RiArrowDropDownLine />
      </div>}
      <div id="searchbox">
        <input
          id="wubesearch"
          style={{
            backgroundColor: "rgb(227,227,227)",
            border: "none",
            marginLeft: "4px",
            fontFamily: "Inter",
          }}
          type="text"
          placeholder="Wube you some food"
        />
        <img
          style={{
            width: "25px",
            height: "25px",
            marginRight: "15px",
            cursor: "pointer",
          }}
          src={magnifyingglasssolid}
          alt="The search icon"
        />
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
