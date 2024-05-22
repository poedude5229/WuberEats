import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadRestaurantsThunk } from "../../redux/restaurant";
import { MdStarBorder } from "react-icons/md";
import "./Details.css";
function Details() {
  let { restaurantId } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRestaurantsThunk());
  }, [dispatch]);
  let all = useSelector((state) => state.restaurantReducer);
  let selected = all[restaurantId];
  let menu = selected?.menu_items;
  console.log(menu);
  return (
    <>
      <div className="details-container">
        <img
          src={selected?.cover_image}
          alt={`${selected?.name} cover image`}
          className="detailspage-main-img"
        />
        <h1 className="title-address">
          {selected?.name} &#40;{selected?.address}&#41;{" "}
        </h1>
        <p className="starRating">
          {selected?.avgrating} <MdStarBorder /> • {selected?.reviews?.length}{" "}
          reviews
        </p>
        <br />
        <div className="description">{selected?.description}</div>
      </div>
      <section>
        {menu.map((item) => (
          <div className="menu-item-container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img className="menu-item-image" src={item.image_url} alt="" />{" "}
              <span className="dot">
                <p
                  style={{
                    fontSize: "40px",
                    position: "relative",
                    bottom: "47px",
                  }}
                >
                  +
                </p>
              </span>
            </div>
            <p className="menu-item-name">{item.name}</p>

            <p className="menu-item-price">${item.price}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Details;
