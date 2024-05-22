import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRestaurantsThunk } from "../../redux/restaurant";
import { MdOutlineStar } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import "./Landing.css";
import { NavLink } from "react-router-dom";
function Landing() {
  let restaurants = useSelector((state) => state.restaurantReducer);
  restaurants = Object.values(restaurants);
  console.log(restaurants);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRestaurantsThunk());
  }, [dispatch]);
  return (
    <>
      <section style={{gap: "100px"}}>
        <div style={{ backgroundColor: "Orange" }} className="wube-cards">
          <span className="wubeAdText">
            Wube that? Order that!
            <button
              style={{ width: "150px", height: "50px", marginTop: "104px", color: "white", backgroundColor: "black", borderRadius: "12px" }}
            >Getchu some food!</button>
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
              fontSize: "18px",
              textAlign: "center",
              marginLeft: "200px",
            }}
          >
            Willem Dafoe ordered here once. It was so good, bro hit this pose
          </span>
          <img
            src="https://pbs.twimg.com/media/GASGdkPWgAEpnj_.jpg"
            alt="willem dapose"
            style={{ marginRight: "12px" }}
          />
          <button
            style={{
              position: "absolute",
              marginLeft: "104px",
              marginTop: "200px",
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
            }}
          >
            <span style={{ marginTop: "8px" }}>
              Wube it now, Wube it real good
            </span>{" "}
            <RiArrowRightLine style={{ marginTop: "10px", fontSize: "24px" }} />
          </button>
        </div>
      </section>
      <section>
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
                    ? restaurant?.avgrating
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
