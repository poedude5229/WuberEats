import { useRef } from "react";
import { useSelector } from "react-redux";
import "./Carousel.css";

export function Carousel() {
  const restaurants = Object.values(
    useSelector((state) => state.restaurantReducer)
  );
  const carouselRef = useRef(null);

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
          <div className="carousel-item" key={restaurant.id}>
            <div className="carousel-pic-container">
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
