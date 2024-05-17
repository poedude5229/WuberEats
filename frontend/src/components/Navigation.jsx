import { NavLink } from "react-router-dom";
import hamberderDarkLogo from "../assets/hamberderDarkLogo.png";
import "./Navigation.css";
import magnifyingglasssolid from "../assets/magnifying-glass-solid.png";
import cart from "../assets/cart-shopping-solid.png";
function Navigation() {
  return (
    <nav id="sitenav">
      <div id="menucontainer">
        <div id="ham-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div id="homelogonavlink">
          {" "}
          <NavLink id="WuberEatsLogoLink" to="/">
            <img
              src={hamberderDarkLogo}
              alt="Site icon Dark on light"
              id="sitelogo"
              style={{ width: "100px", height: "100px" }}
            />
            WuberEats
          </NavLink>
        </div>
      </div>
      <div id="searchbox">
        <input
          id="searchinput"
          type="text"
          placeholder="Look for something bold..."
        />
        <img
          src={magnifyingglasssolid}
          style={{
            width: "25px",
            height: "25px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          alt="none"
          id="magnifying"
        />
      </div>
      <div id="shopping-cart-button">
        <img
          src={cart}
          alt="shoppingcartimg"
          style={{ width: "25px", height: "25px" }}
        />
      </div>
    </nav>
  );
}

export default Navigation;
