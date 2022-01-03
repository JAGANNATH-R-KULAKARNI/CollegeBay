const initialState = null;

const updateCart = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_THE_CART":
      return action.payload;
    default:
      return state;
  }
};

export default updateCart;
