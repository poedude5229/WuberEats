import {
  deleteAReviewBasedOffARestaurantThunk,
  getReviewsByRestaurantIdThunk,
  loadRestaurantsThunk,
} from "../../redux/restaurant";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteReview.css";

export const DeleteReview = ({ restaurantId, reviewId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  // const restaurantId = useParams();

  const deleteReviewEvent = (e) => {
    e.preventDefault();

    // const deletedReview = await dispatch(
    dispatch(deleteAReviewBasedOffARestaurantThunk(restaurantId, reviewId));
    // );

    // dispatch(getReviewsByRestaurantIdThunk(restaurantId));
    dispatch(loadRestaurantsThunk());
    navigate(`/restaurants/${restaurantId}`);
    closeModal();
    // closeModal();
  };

  return (
    <div className="delete-modal">
      <div className="modal-container">
        <h1 className="delete-confirm">Confirm Deletion</h1>
        <p>Would you like to delete this review?</p>
        <div className="button-group">
          <div className="delete-button">
            <button className="d-bttn" onClick={deleteReviewEvent}>
              Delete
            </button>
          </div>
          <div className="cancel-button">
            <button className="c-bttn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
