import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Landing from "../components/LandingPage/Landing";
import Details from "../components/Details/RestaurantDetails";
import RestaurantCreation from "../components/RestaurantForm/RestaurantCreation";
import UpdatingRestaurant from "../components/RestaurantForm/UpdatingRestaurant"
import MenuForm from "../components/MenuForm/MenuForm";
import { Checkout } from "../components/Checkout/Checkout";
import UpdateMenuForm from "../components/MenuForm/UpdateMenuForm";
import { About } from "../components/About/About";
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
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: '/restaurants/:restaurantId/menu/new',
        element: <MenuForm/>

      },
      {
        path: '/restaurants/:restaurantId/menus/:menuId/update',
        element: <UpdateMenuForm/>

      },
      {
        path: "/about",
        element: <About />
      }
    ],
  },
]);
