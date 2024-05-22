const ADD = "cart/ADD";
export function addToCart(itemId) {
  return {
    type: ADD,
    payload: itemId,
  };
}

const DELETE = "cart/DELETE";
export function removeFromCart(itemId) {
  return {
    type: DELETE,
    payload: itemId,
  };
}

const DECREMENT = "cart/DECREMENT";
export function decrementCartItem(itemId) {
  return {
    type: DECREMENT,
    payload: itemId,
  };
}

export const addToCartThunk = (id) => async (dispatch) => {
  await dispatch(addToCart(id));
};

export const deletefromCartThunk = (id) => async (dispatch) => {
  await dispatch(removeFromCart(id));
};

export const decrementCartItemThunk = (id) => async (dispatch) => {
  await dispatch(decrementCartItem(id));
};

export function cartReducer(state = {}, action) {
  switch (action.type) {
    case ADD: {
      const itemId = action.payload;
      let currentCount = state[itemId] ? state[itemId].count : 0;
      return {
        ...state,
        [itemId]: { id: itemId, count: currentCount + 1 },
      };
    }
    case DELETE: {
      let newState = { ...state };
      delete newState[action.payload];
      return newState;
      }

      case DECREMENT: {
          let itemId = action.payload;
          let currentCount = state[itemId].count
          return {
              ...state,
              [itemId]: {id: itemId, count: currentCount - 1}
          }
          }
    default:
      return state;
  }
}
