import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadRestaurantsThunk } from "../../redux/restaurant";
import { addToCartThunk } from "../../redux/cart";
import { MdStarBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Details.css";
function Details() {
  let { restaurantId } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRestaurantsThunk());
  }, [dispatch]);
  let all = useSelector((state) => state.restaurantReducer);
  const currentUser = useSelector((state => state.session.user))
  console.log('current-user', currentUser);
  let cartState = useSelector((state) => {
    state.cart;
  });
  let selected = all[restaurantId];
  console.log(selected?.owner_id);
  let menu = selected?.menu_items;
  //   console.log(selected);
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
        <div className="description">{selected?.description}</div>
        <p className="starRating">
          {selected?.reviews?.length > 0 ? `${selected?.avgrating}` : `New!`}{" "}
          {selected?.reviews.length > 0 && <MdStarBorder />}{" "}
          {selected?.reviews?.length > 0
            ? selected.reviews.length > 1
              ? `${selected.reviews.length} reviews`
              : "1 review"
            : "Be the first to leave a review!"}
        </p>
        <br />
        
      </div>
      <section>
        {menu?.map((item) => (
          <div key={item.id} className="menu-item-container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img className="menu-item-image" src={item.image_url} alt="" />{" "}
              <span
                className="dot"
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(addToCartThunk(item.id))}
              >
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
        {currentUser.id === selected?.owner_id && <button><NavLink to='/restaurants/:restaurantId/update'>Update Your Restaurant</NavLink></button>}
      </section>
    </>
  );
}

export default Details;
