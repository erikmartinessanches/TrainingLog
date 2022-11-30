export const reducer = (state, action) => {
  if (action.type === "SIGNUP_RESULTS") {
    return { ...state, user: { ...action.payload } };
  }
  return { ...state };
};
