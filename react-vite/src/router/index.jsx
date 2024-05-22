import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Landing from "../components/LandingPage/Landing";
import { CreateAReview } from "../components/CreateReview/CreateReview";

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
        path: "/restaurants/:restaurantId/reviews/new",
        element: <CreateAReview />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
