import { NavLink, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DarkSiteLogo from "../../../public/hamberderDarkLogo.png";
import magnifyingglasssolid from "../../../public/magnifying-glass-solid.png";
import { useSelector } from "react-redux";
import cart from "../../../public/cart.png";
import { useEffect, useRef, useState } from "react";
function Navigation() {
  let navigate = useNavigate();
  let user = useSelector((state) => state.session.user);
  let cartState = useSelector((state) => state.cart);
  let cartItems = Object.values(cartState);
  let restaurants = useSelector((state) => state.restaurantReducer);
  restaurants = [...Object.values(restaurants)];
  let menuItems = [];
  restaurants.forEach((restaurant) => menuItems.push(...restaurant.menu_items));
  console.log(menuItems);

  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    }
    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);
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
      </div>
      {user && (
        <div id="address-box">
          {user?.address} • Now
          <RiArrowDropDownLine />
        </div>
      )}
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
      {user && (
        <div
          id="shopping-cart-container"
          onClick={() => setCartOpen(cartOpen === true ? false : true)}
          style={{ cursor: "pointer" }}
          ref={cartRef}
        >
          <img
            src={cart}
            alt="You don't need an alt tag"
            style={{ width: "35px", height: "35px", marginTop: "20px" }}
          />
        </div>
      )}
      {user && cartOpen && (
        <>
          <div className="cartMenu" style={{ overflowY: "scroll" }}>
            {cartItems.map((item) => (
              <div key={item.id}>
                <b>
                  {menuItems.find((thing) => thing.id === item.id).restaurant}
                </b>
                <p>
                  {menuItems.find((thing) => thing.id === item.id).name} X
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
