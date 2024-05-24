// actions
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
const CREATE_RESTAURANT = "restaurants/CREATE_RESTAURANT";
const LOAD_SINGLE_RESTAURANT = "restaurants/LOAD_SINGLE_RESTAURANT";
const UPDATE_RESTAURANT = "restaurants/EDIT_RESTAURANT";
const DELETE_RESTAURANT = "restaurants/DELETE_RESTAURANT";

const CREATE_MENU_BY_RESTAURANT_ID = "restaurants/CREATE_MENU_BY_RESTAURANT_ID";
const LOAD_MENU_BY_RESTAURANT_ID = "restaurants/LOAD_MENU_BY_RESTAURANT_ID";
const EDIT_MENU_BY_RESTAURANT_ID = "restaurants/EDIT_MENU_BY_RESTAURANT_ID";
const DELETE_MENU_BY_RESTURANT_ID = "restaurants/DELETE_MENU_BY_RESTAURANT_ID";

const CREATE_REVIEW_BY_RESTAURANT_ID =
  "restaurants/CREATE_REVIEW_BY_RESTAURANT_ID";
const LOAD_REVIEW_BY_RESTAURANT_ID = "restaurants/LOAD_REVIEW_BY_RESTAURANT_ID";
const EDIT_REVIEW_BY_RESTAURANT_ID = "restaurants/EDIT_REVIEW_BY_RESTAURANT_ID";
const DELETE_REVIEW_BY_RESTAURANT_ID =
  "restaurants/DELETE_REVIEW_BY_RESTAURANT_ID";

// action creator for RESTAURANTEEE

const loadRestaurants = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  payload: restaurants,
});

const createRestaurant = (restaurant) => ({
  type: CREATE_RESTAURANT,
  payload: restaurant,
});

const loadSingleRestaurantbyId = (restaurant) => ({
  type: LOAD_SINGLE_RESTAURANT,
  payload: restaurant,
});

export const editRestaurant = (restaurant) => {
  return {
    type: UPDATE_RESTAURANT,
    restaurant,
  };
};

const deleteRestaurant = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  payload: restaurantId,
});

// action creator for MENU

const createMenuByRestaurantId = (menu) => ({
  type: CREATE_MENU_BY_RESTAURANT_ID,
  payload: menu,
});

const loadMenuByRestaurantId = (menu) => ({
  type: LOAD_MENU_BY_RESTAURANT_ID,
  payload: menu,
});

export const editMenuByRestaurantId = (menu) => {
  return {
    type: EDIT_MENU_BY_RESTAURANT_ID,
    menu
  };
};

const deleteMenuByRestaurantId = (menuId) => ({
  type: DELETE_MENU_BY_RESTURANT_ID,
  payload: menuId,
});

// action creator for REVIEW

const createReviewByRestaurantId = (review) => ({
  type: CREATE_REVIEW_BY_RESTAURANT_ID,
  payload: review,
});

const loadReviewByRestaurantId = (review) => ({
  type: LOAD_REVIEW_BY_RESTAURANT_ID,
  payload: review,
});

const editReviewByRestaurantId = (review) => ({
  type: EDIT_REVIEW_BY_RESTAURANT_ID,
  payload: review,
});

const deleteReviewByRestaurantId = (reviewId) => ({
  type: DELETE_REVIEW_BY_RESTAURANT_ID,
  payload: reviewId,
});

/// thunkkkk action creator

// RESTAURANT -----------------------------------------------------------------------
// Load all the restaurants
export const loadRestaurantsThunk = () => async (dispatch) => {
  try {
    const res = await fetch("/api/restaurants");

    const data = await res.json();
    // console.log(`res ${data}`);

    if (!res.ok) {
      return { errors: data };
    }

    // const { Restaurants } = data;
    await dispatch(loadRestaurants(data.restaurants));

    return data;
  } catch (error) {
    console.error("Failed to load restaurants:", error);
    return { errors: error.message };
  }
};

// Create a new restaurant
export const createRestaurantThunk = (restaurant) => async (dispatch) => {
  try {
    const res = await fetch("/api/restaurants/new", {
      method: "POST",
      body: restaurant,
    });

    const data = await res.json();
    console.log(`res ${data}`);

    if (!res.ok) return { errors: data };

    await dispatch(createRestaurant(data));
    return data;
  } catch (error) {
    console.error("Failed to create restaurants:", error);
    return { errors: error.message };
  }
};

// Get Restaurant by Id
export const restaurantByIdThunk = (restaurantId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/restaurants/${restaurantId}`);
    const data = await res.json();
    // console.log(`res ${data}`);

    if (!res.ok) {
      return { errors: data };
    }

    await dispatch(loadSingleRestaurantbyId(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch by restaurant by id:", error);
    return { errors: error.message };
  }
};

// Update a restaurant
export const editRestaurantThunk = (restaurantId, restaurant) => async (dispatch) => {

      const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: "PUT",
        body: restaurant,
      });

      const data = await res.json();
      console.log(data)
      // console.log(`res ${data}`);

      if (!res.ok) {
        return { errors: data };
      }
      // await dispatch(loadSingleRestaurantbyId(restaurantId))
      await dispatch(editRestaurant(data));
      return data;

  };

// Delete a restaurant
export const deleteRestaurantThunk = (restaurantId) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurantId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(`res ${data}`);

    if (!res.ok) {
      return { errors: data };
    }

    await dispatch(deleteRestaurant(restaurantId));



};

// MENU ITEMS -----------------------------------------------------------------------
// Get Menu Items by Restaurant Id
export const getMenusByRestaurantIdThunk =
  (restaurantId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/menus`);

      const data = await res.json();

      console.log(`res ${data}`);

      if (!res.ok) {
        return { errors: data };
      }

      await dispatch(loadMenuByRestaurantId(data.menus));

      return data;
    } catch (error) {
      console.error("Failed to load menus for restaurants:", error);
      return { errors: error.message };
    }
  };

// Post a new menu item for the restaurant
export const postANewMenuForRestaurantThunk =
  (restaurantId, menu) => async (dispatch) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/menus/new`, {
        method: "POST",
        body: menu,
      });
      const data = await res.json();
      console.log(`res ${data}`);

      if (!res.ok) return { errors: data };

      await dispatch(createMenuByRestaurantId(data));
      return data;
    } catch (error) {
      console.error("Failed to create a menu for a restaurant :", error);
      return { errors: error.message };
    }
  };

// Update a menu item for the restaurant
export const updateAMenuForARestaurantThunk = (restaurantId, menu, menuId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/restaurants/${restaurantId}/menu/${menuId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...menu}),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.errors || "Failed to update the menu");
    }

    const data = await res.json();
    console.log(`res ${data}`);

    await dispatch(editMenuByRestaurantId(data));
    return data;
  } catch (error) {
    console.error("Failed to update the menu by restaurant id:", error);
    return { errors: error.message };
  }
};

// Delete a menu item
export const deleteAMenuBasedOffARestaurantThunk =
  (restaurantId, menuId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/menu/${menuId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(`res ${data}`);

      if (!res.ok) {
        return { errors: data };
      }

      await dispatch(deleteMenuByRestaurantId(menuId));
    } catch (error) {
      console.error("Failed to delete menu based of restaurant id:", error);
      return { errors: error.message };
    }
  };

// REVIEWS -----------------------------------------------------------------------
// Get Review of a Restaurant
export const getReviewsByRestaurantIdThunk =
  (restaurantId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/reviews`);

      const data = await res.json();

      console.log(`res ${data}`);

      if (!res.ok) {
        return { errors: data };
      }

      await dispatch(loadReviewByRestaurantId(data.reviews));

      return data;
    } catch (error) {
      console.error("Failed to load reviews for restaurants:", error);
      return { errors: error.message };
    }
  };

// Create a new review for the restaurant
export const postANewReviewForRestaurantThunk =
  (restaurantId, review) => async (dispatch) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/reviews/new`, {
        method: "POST",
        body: review,
      });
      const data = await res.json();
      console.log(`res ${data}`);

      if (!res.ok) return { errors: data };

      await dispatch(createReviewByRestaurantId(data));
      return data;
    } catch (error) {
      console.error("Failed to create a review for a restaurant :", error);
      return { errors: error.message };
    }
  };

// Edit a Review
export const updateAReviewForARestaurantThunk =
  (restaurantId, review, reviewId) => async (dispatch) => {
    try {
      const res = await fetch(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}`,
        {
          method: "PUT",
          body: review,
        }
      );

      const data = await res.json();
      console.log(`res ${data}`);

      if (!res.ok) {
        return { errors: data };
      }

      await dispatch(editReviewByRestaurantId(data));
      return data;
    } catch (error) {
      console.error("Failed to update the review by restaurant id:", error);
      return { errors: error.message };
    }
  };

// Delete a review
export const deleteAReviewBasedOffARestaurantThunk =
  (restaurantId, reviewId) => async (dispatch) => {
    try {
      const res = await fetch(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(`res ${data}`);

      if (!res.ok) {
        return { errors: data };
      }

      await dispatch(deleteReviewByRestaurantId(reviewId));
    } catch (error) {
      console.error("Failed to delete review based of restaurant id:", error);
      return { errors: error.message };
    }
  };

/// the reducerrrrrrrrrr
function restaurantReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_RESTAURANTS: {
      const newState = {};
      action.payload.forEach((eachRestaurant) => {
        newState[eachRestaurant.id] = eachRestaurant;
      });
      return newState;
    }
    case LOAD_SINGLE_RESTAURANT: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case CREATE_RESTAURANT: {
      const newState = { ...state };
      // console.log(newState);
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case UPDATE_RESTAURANT: {
      return {
        ...state,
        [action.restaurant.id]: action.restaurant
      };
    }
    case DELETE_RESTAURANT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    // MENU ------------------------------------------------------
    case LOAD_MENU_BY_RESTAURANT_ID: {
      const newState = {};
      action.payload.forEach((menuItem) => {
        newState[menuItem.id] = menuItem;
      });
      return newState;
    }

    case CREATE_MENU_BY_RESTAURANT_ID: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case EDIT_MENU_BY_RESTAURANT_ID: {
      return {
        ...state,
        [action.menu.id]: action.menu
      };
    }
    case DELETE_MENU_BY_RESTURANT_ID: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    // REVIEW ------------------------------------------------------
    case LOAD_REVIEW_BY_RESTAURANT_ID: {
      const newState = {};
      action.payload.forEach((eachReview) => {
        newState[eachReview.id] = eachReview;
      });
      return newState;
    }

    case CREATE_REVIEW_BY_RESTAURANT_ID: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case EDIT_REVIEW_BY_RESTAURANT_ID: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_REVIEW_BY_RESTAURANT_ID: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    default:
      return state;
  }
}

export default restaurantReducer;
