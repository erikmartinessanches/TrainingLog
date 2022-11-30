import React from "react";

export const reducer = (state, action) => {
  if (action.type === "SIGNUP_RESULTS") {
    return { ...state, signUpResults: { ...action.payload } };
  }
  return { ...state };
};
