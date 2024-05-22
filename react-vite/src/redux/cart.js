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

export const addToCartThunk = (id) => async (dispatch) => {
    await dispatch(addToCart(id))
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
    default:
      return state;
  }
}
