import { useRef } from "react";
import { useSelector } from "react-redux";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

export function Carousel() {
  const restaurants = Object.values(
    useSelector((state) => state.restaurantReducer)
  );
  const carouselRef = useRef(null);
  let navigate = useNavigate()
  const scrollLeft = () => {
    // if (carouselRef.current) {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    // }
  };

  const scrollRight = () => {
    // if (carouselRef.current) {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    // }
  };

  return (
    <div className="carousel-wrapper">
      <button className="carousel-button left" onClick={scrollLeft}>
        {"<"}
      </button>
      <button className="carousel-button right" onClick={scrollRight}>
        {">"}
      </button>
      <section className="carousel-container" ref={carouselRef}>
        {restaurants.reverse().map((restaurant) => (
          <div
            onClick={() => {
              navigate(`/restaurants/${restaurant.id}`);
            }}
            className="carousel-item"
            key={restaurant.id}
          >
            <div className="carousel-pic-container">
              <p className="carousel-title">{restaurant.name}</p>
              <img
                className="carouselPic"
                src={restaurant.cover_image}
                alt=""
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
