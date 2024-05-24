import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadRestaurantsThunk } from "../../redux/restaurant";
import { addToCartThunk } from "../../redux/cart";
import { MdStarBorder } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteRestaurantModal from "../RestaurantForm/DeleteRestaurant";
import DeleteAMenu from "../MenuForm/DeleteAMenu";
import CreateReview from "../CreateReview/CreateReview";

import "./Details.css";
import { DeleteReview } from "../DeleteReview/DeleteReview";
import { UpdateAReview } from "../UpdateReview/UpdateReview";

function Details() {
  let { restaurantId } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurantsThunk());
  }, [dispatch]);

  let all = useSelector((state) => state.restaurantReducer);
  const currentUser = useSelector((state) => state.session.user);

  let cartState = useSelector((state) => state.cart);

  let selected = all[restaurantId];
  let reviewIdLog = [];
  selected?.reviews?.forEach((review) => {
    reviewIdLog.push(review.user_id);
  });
  // console.log(reviewIdLog);
  let menu = selected?.menu_items;

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
        <div>
          <p className="starRating">
            {selected?.reviews?.length > 0
              ? `${(selected?.avgrating).toFixed(2)}`
              : `New!`}{" "}
            {selected?.reviews?.length > 0 && <MdStarBorder />}{" "}
            {selected?.reviews?.length > 0
              ? selected?.reviews?.length > 1
                ? ` • ${selected?.reviews?.length} reviews`
                : "1 review"
              : " • Be the first to leave a review!"}
          </p>
          {currentUser &&
            currentUser?.id !== selected?.owner_id &&
            !reviewIdLog.includes(currentUser?.id) && (
              <OpenModalMenuItem
                itemText={
                  <button
                    style={{
                      width: "100px",
                      height: "40px",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Leave a review!
                  </button>
                }
                modalComponent={<CreateReview />}
              ></OpenModalMenuItem>
            )}

          <br />
          {selected?.reviews?.length > 0 && (
            <div
              style={{
                border: "1px solid black",
                width: "800px",
                borderRadius: "12px",
                paddingLeft: "8px",
              }}
            >
              <h3 style={{ cursor: "pointer" }}>Reviews and Ratings</h3>
              {selected?.reviews?.map((review) => (
                <>
                  <span>
                    <span style={{ fontWeight: "900" }}>
                      {review.user_firstname}
                    </span>{" "}
                    {`${review.rating} stars`}{" "}
                    {review.rating == 5 ? (
                      <FaStar style={{ color: "gold" }} />
                    ) : review.rating == 4 ? (
                      <FaStar style={{ color: "brown" }} />
                    ) : review.rating == 3 ? (
                      <FaStar style={{ color: "grey" }} />
                    ) : review.rating == 2 ? (
                      <FaStar />
                    ) : (
                      <FaRegStar />
                    )}
                  </span>
                  <p>{review.review}</p>
                  {currentUser && currentUser?.id === review?.user_id && (
                    <OpenModalMenuItem
                      itemText={<button>Delete this review</button>}
                      modalComponent={
                        <DeleteReview
                          restaurantId={selected?.id}
                          reviewId={review.id}
                        />
                      }
                    />
                  )}
                  {currentUser && currentUser?.id === review?.user_id && (
                    <OpenModalMenuItem
                      itemText={<button>Update this review</button>}
                      modalComponent={
                        <UpdateAReview
                          reviewId={review?.id}
                          restaurantId={selected?.id}
                          review={review?.review}
                        />
                      }
                    />
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
      <section id="details-section">
        {menu?.map((item) => (
          <div
            key={item.id}
            className="menu-item-container"
            style={{ width: "400px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "400px",
              }}
            >
              <img className="menu-item-image" src={item.image_url} alt="" />{" "}
              {currentUser && currentUser?.id !== selected?.owner_id && (
                <span
                  className="dot"
                  style={{ cursor: "pointer", position: "absolute" }}
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
              )}
            </div>
            <p className="menu-item-name">{item.name}</p>
            <p className="menu-item-price">${item.price}</p>

            {currentUser?.id === selected?.owner_id && (
              <NavLink
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  border: "1 px solid black",
                  width: "100px",
                  height: "45px",
                  backgroundColor: "black",
                  color: "white",
                  textDecoration: "none",
                  paddingTop: "5px",
                  textAlign: "center",
                }}
                to={`/restaurants/${selected?.id}/menus/${item.id}/update`}
              >
                Update Menu Item
              </NavLink>
            )}
            {currentUser?.id === selected?.owner_id && (
              <OpenModalMenuItem
                itemText={
                  <button
                    style={{
                      width: "100px",
                      height: "50px",
                      backgroundColor: "black",
                      color: "white",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Delete Menu Item
                  </button>
                }
                className="delete-btn-getall"
                modalComponent={
                  <DeleteAMenu restaurantId={+selected?.id} menuId={item.id} />
                }
              />
            )}
          </div>
        ))}
        <div className="buttons-con">
          {currentUser?.id === selected?.owner_id && (
            <button
              style={{
                width: "100px",
                height: "40px",
                backgroundColor: "black",
                border: "none",
              }}
            >
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to={`/restaurants/${selected?.id}/update`}
              >
                Update Your Restaurant
              </NavLink>
            </button>
          )}
          <div className="delete-button-container">
            {currentUser?.id === selected?.owner_id && (
              <OpenModalMenuItem
                itemText={
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      width: "100px",
                      height: "70px",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Delete this restaurant?
                  </button>
                }
                className="delete-btn-getall"
                modalComponent={
                  <DeleteRestaurantModal restaurantId={+selected?.id} />
                }
              />
            )}
            {currentUser?.id === selected?.owner_id && (
              <NavLink style={{}} to={`/restaurants/${selected?.id}/menu/new`}>
                Create a menu item
              </NavLink>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
