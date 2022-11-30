import axios from "axios";
import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const fbMiddleware = (store) => (next) => (action) => {
  if (action.type === "SIGNUP") {
    const inputUserData = action.payload;
    if (inputUserData) {
      store.dispatch({
        type: "SIGNUP_RESULTS",
        payload: {
          loading: true,
          data: null,
          error: null,
        },
      });
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        inputUserData.email,
        inputUserData.password
      ).then((userCredential) => {
        const user = userCredential.user;
        store.dispatch({
          type: "SIGNUP_RESULTS",
          payload: {
            loading: false,
            error: null,
            data: user,
          },
        });
      });
    }
  }

  return next(action);
};
