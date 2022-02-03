const initialState = "";

const searchText = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TEXT":
      return action.payload;
    default:
      return state;
  }
};

export default searchText;
