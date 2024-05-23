import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Landing from "../components/LandingPage/Landing";
import Details from "../components/Details/RestaurantDetails";
import RestaurantCreation from "../components/RestaurantForm/RestaurantCreation";
import UpdatingRestaurant from "../components/RestaurantForm/UpdatingRestaurant"
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
        path: "/restaurants/new",
        element: <RestaurantCreation/>
      },
      {
        path: "/restaurants/:restaurantId",
        element: <Details />,
      },
      {
        path: "/restaurants/:restaurantId/update",
        element: <UpdatingRestaurant />,
      },
    ],
  },
]);
