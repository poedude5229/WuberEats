import { NavLink, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DarkSiteLogo from "../../../public/hamberderDarkLogo.png";
import LightSiteLogo from "../../../public/hamberderLightLogo.png";
import magnifyingglasssolid from "../../../public/magnifying-glass-solid.png";
import { useDispatch, useSelector } from "react-redux";
import cart from "../../../public/cart.png";
import { useEffect, useRef, useState } from "react";
import {
  addToCartThunk,
  decrementCartItemThunk,
  deletefromCartThunk,
  getThisOffMyScreen,
  setCartState,
} from "../../redux/cart";
import { GoTrash } from "react-icons/go";
function Navigation() {
  let navigate = useNavigate();
  let user = useSelector((state) => state.session.user);
  let cartState = useSelector((state) => state.cart);
  let cartItems = Object.values(cartState);
  let restaurants = useSelector((state) => state.restaurantReducer);
  restaurants = [...Object.values(restaurants)];
  let menuItems = [];
  let dispatch = useDispatch();
  const [sumP, setSumP] = useState(0);

  restaurants.forEach((restaurant) => {
    const items = restaurant.menu_items ?? [];
    menuItems.push(...items);
  });

  // console.log(menuItems);

  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef();

  useEffect(() => {
    const storedCartState = localStorage.getItem("cartState");
    if (storedCartState) {
      dispatch(setCartState(JSON.parse(storedCartState)));
    }
  }, [dispatch]);

  useEffect(() => {
    let cartSum = 0;
    cartItems.forEach((cart) => (cartSum += cart.count));
    setSumP(cartSum);
  }, [cartItems]);
  // console.log(sumP);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartState", JSON.stringify(cartState));
    } else if (cartItems.length == 0) {
      localStorage.removeItem("cartState");
    }
  });

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

  const calculateTotalPrice = () => {
    return cartItems
      ?.reduce((total, item) => {
        const menuItem = menuItems?.find((thing) => thing?.id === item?.id);
        return total + menuItem?.price * item.count;
      }, 0)
      .toFixed(2);
  };
  return (
    <nav id="sitenav">
      <div id="sitenav-logo-link">
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
          {user?.address}
          {/* <RiArrowDropDownLine /> */}
        </div>
      )}
      {/* <div id="searchbox">
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
      </div> */}
      {user && (
        <div
          id="shopping-cart-container"
          onClick={() => setCartOpen(cartOpen === true ? false : true)}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={cart}
            alt="You don't need an alt tag"
            style={{ width: "40px", height: "40px", marginTop: "20px" }}
          />
          <p
            style={{
              position: "absolute",
              marginTop: "22px",
              marginLeft: "4px",
              color: "white",
              zIndex: "1",
            }}
          >
            {sumP}
          </p>
        </div>
      )}
      {user && cartOpen && (
        <>
          <div
            className="cartMenu"
            ref={cartRef}
            style={{ overflowY: "scroll" }}
          >
            {/* <span style={{width: "200px"}}>Ye Olde Cart</span> */}
            <span id="cart-close-button" onClick={() => setCartOpen(false)}>
              X
            </span>

            {cartItems.map((item) => (
              <>
                <hr />
                <div key={item.id}>
                  <b style={{ marginLeft: "12px" }}>
                    {menuItems.find((thing) => thing.id === item.id).restaurant}
                  </b>
                  <p style={{ marginLeft: "12px" }}>
                    {menuItems.find((thing) => thing.id === item.id).name}{" "}
                  </p>{" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: "12px",
                    }}
                  >
                    <p>Quantity: {item.count}</p>
                    <p style={{ marginRight: "12px" }}>
                      $
                      {menuItems?.find((thing) => thing?.id === item?.id)
                        ?.price * item.count}{" "}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "12px",
                      gap: "14px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      // className="dot"
                      style={{
                        fontSize: "34px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        paddingBottom: "5px",
                        backgroundColor: "rgb(99, 59, 99)",
                        color: "white",
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(addToCartThunk(item.id))}
                    >
                      +
                    </button>
                    <button
                      // className="dot"
                      style={{
                        fontSize: "34px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        paddingBottom: "5px",
                        backgroundColor: "rgb(99, 59, 99)",
                        color: "white",
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        item.count > 1
                          ? dispatch(decrementCartItemThunk(item.id))
                          : dispatch(deletefromCartThunk(item.id))
                      }
                    >
                      -
                    </button>
                    <GoTrash
                      style={{
                        fontSize: "24px",
                        color: "rgb(99,59,99)",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(deletefromCartThunk(item.id))}
                    />
                  </div>
                </div>
              </>
            ))}
            {cartItems.length > 0 && <hr />}
            {cartItems.length == 0 && (
              <>
                <p
                  style={{
                    marginLeft: "60px",
                    marginRight: "60px",
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  Add some items to start Wubering!
                </p>
                <img
                  src={DarkSiteLogo}
                  alt="It's the site logo. I only have so much time to add an alt tag to everything you know."
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "90px",
                  }}
                />
              </>
            )}

            {cartItems.length > 0 && (
              <>
                <span>Total Price: </span>
                <span>${calculateTotalPrice()}</span>
                <button id="checkout-cart-button"

                  onClick={() => {
                    localStorage.setItem("totalPrice", calculateTotalPrice());
                    dispatch(getThisOffMyScreen());
                    localStorage.removeItem("cartState");
                    navigate("/checkout");
                    setCartOpen(false);
                  }}
                >
                  Checkout Cart
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src={LightSiteLogo}
                  />
                </button>
              </>
            )}
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
