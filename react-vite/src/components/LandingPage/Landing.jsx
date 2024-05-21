import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRestaurantsThunk } from "../../redux/restaurant";
import { MdOutlineStar } from "react-icons/md";
import "./Landing.css";
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
      <section>
        <div style={{ backgroundColor: "Orange" }} className="wube-cards">
          <span className="wubeAdText">Wube that? Order that!</span>
          <img
            src="https://shakeshack.com/sites/default/files/styles/locations_mobile/public/location-about-02.jpg?itok=E6VOpWRc"
            alt="Shake Shack Wube Card"
          />
        </div>
      </section>
      <div className="wube-cards"></div>
      <section>
        {restaurants?.map((restaurant) => (
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
        ))}
      </section>
    </>
  );
}

export default Landing;
