import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRestaurantsThunk } from "../../redux/restaurant";
import { MdOutlineStar } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import hamberderLightLogo from "../../../public/hamberderLightLogo.png";
import "./Landing.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Carousel } from "../Carousel/Carousel";
import RickModal from "../rick/RickModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import wumbo from "../../../public/wumboburger.png";
function Landing() {
  let restaurants = useSelector((state) => state.restaurantReducer);
  restaurants = Object.values(restaurants);
  let navigate = useNavigate();
  let [wumboHide, setWumboHide] = useState(true);
  // console.log(restaurants);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRestaurantsThunk());
  }, [dispatch]);

  const getRandomId = () => {
    var cringe = Math.floor(Math.random() * restaurants?.length);
    if (cringe == 0) {
      cringe += 1;
    }
    return cringe;
  };
  return (
    <>
      <section className="bigFlex" style={{ gap: "100px" }}>
        <div style={{ backgroundColor: "Orange" }} className="wube-cards">
          <span
            className="wubeAdText orangeboxtext"
            style={{ marginTop: "95px", marginBottom: "0" }}
          >
            Wube that? Order that!
            <img
              id="orangeboximg"
              style={{
                width: "105px",
                height: "105px",
                position: "inherit",
                top: "205px",
                left: "490px",
              }}
              src={hamberderLightLogo}
              alt="yea"
            />
            <button
              id="trynewbtn"
              style={{
                width: "150px",
                height: "50px",
                marginTop: "20px",
                marginBottom: "90px",
                color: "white",
                backgroundColor: "black",
                borderRadius: "12px",
                fontWeight: "900",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => navigate(`/restaurants/${getRandomId()}`)}
            >
              Try something new!
            </button>
          </span>
          <img
            src="https://shakeshack.com/sites/default/files/styles/locations_mobile/public/location-about-02.jpg?itok=E6VOpWRc"
            alt="Shake Shack Wube Card"
          />
        </div>
        <div className="wube-cards" style={{ backgroundColor: "grey" }}>
          <span
            className="wubeAdText"
            style={{
              fontSize: "20px",
              textAlign: "center",
              marginLeft: "300px",
            }}
          >
            Willem Dafoe ordered here once. It was so good, bro hit this pose
          </span>
          <img
            src="https://pbs.twimg.com/media/GASGdkPWgAEpnj_.jpg"
            alt="willem dapose"
            style={{ marginRight: "42px", right: "22px", position: "inherit" }}
          />
          {/* <OpenModalMenuItem style={{}} */}
          {/* // itemText={ */}
          <button
            id="wube-it-btn"
            style={{
              position: "absolute",
              marginLeft: "280px",
              marginTop: "200px",
              // right: "180px",
              // top: "340px",
              width: "170px",
              height: "50px",
              color: "black",
              backgroundColor: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              flexDirection: "row",
              fontWeight: "900",
              zIndex: "1",
            }}
            onClick={() => setWumboHide(!wumboHide)}
          >
            <span style={{ marginTop: "8px" }}>
              Wube it now, Wube it real good
            </span>{" "}
            <RiArrowRightLine style={{ marginTop: "10px", fontSize: "24px" }} />
          </button>
          {/* // } */}
          {/* // onItemClick={closeMenu} */}
          {/* // modalComponent={RickModal} */}
          {/* // /> */}
        </div>
        <img
          src={wumbo}
          hidden={wumboHide}
          id="hiddenborger"
          alt="hidden borger"
          onClick={() => setWumboHide(!wumboHide)}
        />
      </section>
      <h2 style={{ marginLeft: "30px", paddingTop: "20px" }}>New Arrivals</h2>
      <Carousel id="new" />
      <h2 style={{ marginLeft: "30px" }}>Our Restaurants</h2>
      <section className="bigFlex landing-res-container">
        {restaurants?.map((restaurant) => (
          <NavLink
            className="restaurant-card-container"
            key={restaurant.id}
            to={`restaurants/${restaurant.id}`}
          >
            <div className="restaurant-card">
              <img
                className="cover-image"
                src={restaurant.cover_image}
                alt={restaurant.name + " cover image"}
              />
              <div className="name-review-holder">
                <p className="restaurant-title">{restaurant.name}</p>
                <span className="dot">
                  {restaurant?.reviews?.length !== 0
                    ? (restaurant?.avgrating).toFixed(2)
                    : "New"}
                  {restaurant?.reviews?.length !== 0 && <MdOutlineStar />}
                </span>
              </div>
              <p>
                {restaurant.delivery_radius * 10 >= 60
                  ? (restaurant.delivery_radius * 10) / 60 !== 1.0
                    ? `${((restaurant.delivery_radius * 10) / 60).toFixed(
                        1
                      )} hours`
                    : "1 hour"
                  : `${restaurant.delivery_radius * 10} minutes`}
              </p>
            </div>
          </NavLink>
        ))}
      </section>
    </>
  );
}

export default Landing;
