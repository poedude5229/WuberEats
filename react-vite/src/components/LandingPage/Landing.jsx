import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRestaurantsThunk } from "../../redux/restaurant";

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
    <section>
      {restaurants?.map((restaurant) => (
        <div className="restaurant-card">
          <img
            id="cover-image"
            src={restaurant.cover_image}
            alt={restaurant.name + " cover image"}
          />
          <div className="name-review-holder">
            <p className="restaurant-title">{restaurant.name}</p>
            <span className="dot">
              {restaurant?.reviews?.length !== 0
                ? restaurant?.avgrating + " stars"
                : "No reviews yet"}
            </span>
          </div>
          <p>
            {restaurant.delivery_radius * 10 >= 60
              ? `${((restaurant.delivery_radius * 10) / 60).toFixed(1)} hours`
              : `${restaurant.delivery_radius * 10} minutes`}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Landing;
