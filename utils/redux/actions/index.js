export const incCart = () => {
  return {
    type: "INCREMENT",
    payload: 1,
  };
};

export const decCart = () => {
  return {
    type: "DECREMENT",
    payload: 1,
  };
};

export const justUpdate = (value) => {
  return {
    type: "JUST_UPDATE",
    payload: value,
  };
};
