import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Landing from "../components/LandingPage/Landing";
import Details from "../components/Details/RestaurantDetails";
import { Checkout } from "../components/Checkout/Checkout";
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
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "restaurants/:restaurantId",
        element: <Details />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);
