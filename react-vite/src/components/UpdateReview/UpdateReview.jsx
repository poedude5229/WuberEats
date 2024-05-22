import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import {
  updateAReviewForARestaurantThunk,
  getReviewsByRestaurantIdThunk,
} from "../../redux/restaurant";
import { MdStar, MdStarBorder } from "react-icons/md";
import "./UpdateReview.css";

export const UpdateAReview = () => {
  const { restaurantId } = useParams();
  const { reviewId } = useParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsByRestaurantIdThunk(restaurantId));
  }, [dispatch, restaurantId]);

  const indvReview = useSelector((state) => state.restaurantReducer[reviewId]);
  console.log("INDV REVIEW ====>>>>", indvReview);
  const [review, setReview] = useState(indvReview?.review);
  const [rating, setRating] = useState(indvReview?.rating);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // useEffect(() => {
  //   const errors = {};

  //   if (review.length === 0) {
  //     errors.review = "Review is required.";
  //   }
  //   if (rating === 0) {
  //     errors.rating = "Rating needs at least 1 star.";
  //   }
  //   setValidationErrors(errors);
  // }, [review, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const updatedReview = {
      review,
      rating,
    };
    const submitted = await dispatch(
      updateAReviewForARestaurantThunk(restaurantId, updatedReview, reviewId)
    );

    if (submitted) {
      dispatch(getReviewsByRestaurantIdThunk(restaurantId));
      closeModal();
    }
  };

  // const disabledButton = review.length === 0;

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
              // disabled={disabledButton}
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
