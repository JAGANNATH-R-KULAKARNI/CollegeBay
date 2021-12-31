const initialState = 0;

const changeCartLen = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    case "JUST_UPDATE":
      return action.payload;
    default:
      return state;
  }
};

export default changeCartLen;
