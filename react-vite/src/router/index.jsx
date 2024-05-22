import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Landing from "../components/LandingPage/Landing";
import { UpdateAReview } from "../components/UpdateReview/UpdateReview"; // DELETE AFTER

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "/restaurants/:restaurantId/reviews/:reviewId/new",
        element: <UpdateAReview />, // DELETE AFTER
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
