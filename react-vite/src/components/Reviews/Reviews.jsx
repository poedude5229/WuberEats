import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsByRestaurantIdThunk } from "../../redux/restaurantReducer";
import { CreateAReview } from "../CreateReview/CreateReview";
import "./Reviews.css";
