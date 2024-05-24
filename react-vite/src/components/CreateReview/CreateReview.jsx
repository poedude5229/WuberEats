import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import {
  postANewReviewForRestaurantThunk,
  loadRestaurantsThunk,
  getReviewsByRestaurantIdThunk,
} from "../../redux/restaurant";
import { MdStar, MdStarBorder } from "react-icons/md";
import "./CreateReview.css";

export const CreateReview = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (review.length === 0) {
      errors.review = "Review is required.";
    }
    if (rating === 0) {
      errors.rating = "Rating needs at least 1 star.";
    }
    setValidationErrors(errors);
  }, [review, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const formData = new FormData();

    formData.append("review", review);
    formData.append("rating", rating);

   await dispatch(postANewReviewForRestaurantThunk(restaurantId, formData))
   await dispatch(getReviewsByRestaurantIdThunk(restaurantId));
   await dispatch(loadRestaurantsThunk(restaurantId))
   navigate(`/restaurants/${restaurantId}`)
   closeModal()
  };

  const disabledButton = review.length === 0;

  return (
    <div className="review-modal">
      <div className="container-review">
        <label>
          <textarea
            className="review-text-area"
            value={review}
            type="text"
            placeholder="Describe your WuberEats experience here..."
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </label>
        <div style={{ color: "red" }}>
          {hasSubmitted && validationErrors.review}
        </div>
        <div className="new-rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <span key={num} onClick={() => setRating(num)}>
              {num <= rating ? (
                <MdStar className="star selected" />
              ) : (
                <MdStarBorder className="star" />
              )}
            </span>
          ))}
        </div>
        <div style={{ color: "red" }}>
          {hasSubmitted && validationErrors.rating}
        </div>
        <div className="create-button-container">
          <div className="submit-button">
            <button
              onClick={handleSubmit}
              className="created-review"
              disabled={disabledButton}
            >
              {" "}
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreateReview
