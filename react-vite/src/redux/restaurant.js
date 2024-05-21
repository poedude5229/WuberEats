// actions
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
const CREATE_RESTAURANT = "restaurants/CREATE_RESTAURANT";
const LOAD_SINGLE_RESTAURANT = "restaurants/LOAD_SINGLE_RESTAURANT";
const EDIT_RESTAURANT = "restaurants/EDIT_RESTAURANT";
const DELETE_RESTAURANT = "restaurants/DELETE_RESTAURANT";

const CREATE_MENU_BY_RESTAURANT_ID = "restaurants/CREATE_MENU_BY_RESTAURANT_ID";
const LOAD_MENU_BY_RESTAURANT_ID = "restaurants/LOAD_MENU_BY_RESTAURANT_ID";
const EDIT_MENU_BY_RESTAURANT_ID = "restaurants/EDIT_MENU_BY_RESTAURANT_ID";
const DELETE_MENU_BY_RESTURANT_ID = "restaurants/DELETE_MENU_BY_RESTAURANT_ID";

const CREATE_REVIEW_BY_RESTAURANT_ID = "restaurants/CREATE_REVIEW_BY_RESTAURANT_ID";
const LOAD_REVIEW_BY_RESTAURANT_ID = "restaurants/LOAD_REVIEW_BY_RESTAURANT_ID";
const EDIT_REVIEW_BY_RESTAURANT_ID = "restaurants/EDIT_REVIEW_BY_RESTAURANT_ID";
const DELETE_REVIEW_BY_RESTAURANT_ID = "restaurants/DELETE_REVIEW_BY_RESTAURANT_ID";

// action creator for RESTAURANTEEE

const loadRestaurants = (restaurants) => ({
    type: LOAD_RESTAURANTS,
    payload: restaurants
})

const createRestaurant = (restaurant) => ({
    type: CREATE_RESTAURANT,
    payload: restaurant
})

const loadSingleRestaurantbyId = (restaurant) => ({
    type: LOAD_SINGLE_RESTAURANT,
    payload: restaurant
})

const editRestaurant = (restaurant) => ({
    type: EDIT_RESTAURANT,
    payload: restaurant
})

const deleteRestaurant = (restaurantId) => ({
    type : DELETE_RESTAURANT,
    payload: restaurantId
})

// action creator for MENU

const createMenuByRestaurantId = (menu) => ({
    type: CREATE_MENU_BY_RESTAURANT_ID,
    payload: menu
})

const loadMenuByRestaurantId = (menu) => ({
    type: LOAD_MENU_BY_RESTAURANT_ID,
    payload: menu
})

const editMenuByRestaurantId = (menu) => ({
    type: EDIT_MENU_BY_RESTAURANT_ID,
    payload: menu
})

const deleteMenuByRestaurantId = (menuId) => ({
    type: DELETE_MENU_BY_RESTURANT_ID, 
    payload: menuId
})

// action creator for MENU

const createReviewByRestaurantId = (review) => ({
    type: CREATE_REVIEW_BY_RESTAURANT_ID,
    payload:review
})

const loadReviewByRestaurantId = (review) => ({
    type: LOAD_REVIEW_BY_RESTAURANT_ID,
    payload: review
})

const editReviewByRestaurantId = (review) => ({
    type:EDIT_REVIEW_BY_RESTAURANT_ID,
    payload: review
})

const deleteReviewByRestaurantId = (reviewId) => ({
    type: DELETE_REVIEW_BY_RESTAURANT_ID,
    payload: reviewId
})



/// thunkkkk action creator 

export const loadRestaurantsThunk = () => async (dispatch) => {
    try {
        const res = await fetch("/api/restaurants");

        const data = await res.json();
        console.log(`res ${data}`);

        if (!res.ok) {
            return {"errors": data};
        }

        const { Restaurants } = data;
        await dispatch(loadRestaurants(Restaurants));

        return data;
    } catch (error) {
        console.error('Failed to load restaurants:', error);
        return { "errors": error.message };
    }
};

export const createRestaurantThunk = (restaurant) => async (dispatch) => {
    try {
        const res = await fetch("/api/restaurants/new",{
            method: "POST",
            body:restaurant
        })
        
        const data = await res.json()
        console.log(`res ${data}`)

        if (!res.ok) return {"errors": data}

        await dispatch(createRestaurant(data))
        return data
    } catch (error) {
        console.error('Failed to create restaurants:', error);
        return { "errors": error.message };
    }
}

export const restaurantByIdThunk = (restaurantId) => async (dispatch) => {
    try {

        const res = await fetch(`/api/restaurants/${restaurantId}`)
        const data = await res.json()
        console.log(`res ${data}`)

        if(!res.ok) {
            return {"errors": data}
        }

        await dispatch(loadSingleRestaurantbyId(data))
        return data

        
    } catch (error) {
        console.error('Failed to fetch by restaurant by id:', error);
        return { "errors": error.message };
    }
}

export const editRestaurantThunk = (restaurant, restaurantId) => async (dispatch) => {
    try {
        
        const res = await fetch(`/api/restaurants/${restaurantId}`, {
            method: "PUT",
            body:restaurant
        })

        const data = await res.json()
        console.log(`res ${data}`)

        if(!res.ok) {
            return {"errors": data}
        }

        await dispatch(editRestaurant(data))
        return data;

    } catch (error) {
        console.error('Failed to fetch by restaurant by id:', error);
        return { "errors": error.message };
    }

}

export const deleteRestaurantThunk = (restaurantId) => async (disaptch) => {
    try {

        const res = await fetch(`/api/restaurants/${restaurantId}`, {
            method: "DELETE"
        })
        const data = await res.json()
        console.log(`res ${data}`)

        if(!res.ok) {
            return {"errors": data}
        }
        
        await dispatch(deleteRestaurant(productId))
        
    } catch (error) {

        console.error('Failed to fetch by restaurant by id:', error);
        return { "errors": error.message };

        
    }
}





/// the reducerrrrrrrrrr

function restaurantReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_RESTAURANTS: {
            const newState = {}
            action.restaurants.forEach(eachRestaurant => {
                newState[eachRestaurant.id] = eachRestaurant
            });
            return newState
        }
        case LOAD_SINGLE_RESTAURANT: {
            const newState = {...state, [action.payload.id]: action.payload}
            return newState
        }
        case CREATE_RESTAURANT: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_RESTAURANT: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_RESTAURANT: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
    
    
    default:
        return state
    }
}

export default restaurantReducer