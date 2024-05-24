import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
// import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import bblDrizzy from "../../../public/bb2ca70dc88b4fd38ed9355c07521f30.png";
import crappstore from "../../../public/appstorebadge.png";
import purpapplogo from "../../../public/purpapplogo.png";
import RickModal from "../rick/RickModal";
function ProfileButton() {
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      {/* <button onClick={toggleMenu}>
        <FaUserCircle />
      </button> */}
      <div className="ham-menu" id="firsthammenu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showMenu && (
        <>
          <div className={"profile-dropdown"} ref={ulRef}>
            <div id="top-profile-dropdown-banner">
              <div id="sidebar-ham" className="ham-menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {user ? (
              <div id="user-deets">
                <p>{user.username}</p>
                <p>{user.email}</p>
                <NavLink
                  to="/restaurants/new"
                  style={{
                    color: "rgb(99, 59, 99)",
                    textDecoration: "none",
                    fontWeight: "900",
                  }}
                  onClick={toggleMenu}
                >
                  {" "}
                  Add your restaurant
                </NavLink>
                <button id="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <OpenModalMenuItem
                  className="profiledropdown-tings"
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  className="profiledropdown-tings"
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            )}
            <NavLink
              style={{
                color: "rgb(99, 59, 99)",
                textDecoration: "none",
                fontWeight: "900",
                position: "absolute",
                marginLeft: "90px",
                marginTop: "30px",
              }}
              onClick={closeMenu}
              to="/about"
            >
              About WuberEats
            </NavLink>

            <div id="shameless-promotion">
              <p>Wuber&apos;s better in the app!</p>
              <img id="applogo" src={purpapplogo} alt="Our app logo" />
              <OpenModalMenuItem
                itemText={
                  <img id="downloadlink" src={crappstore} alt="Get it here!" />
                }
                onItemClick={closeMenu}
                modalComponent={RickModal}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
