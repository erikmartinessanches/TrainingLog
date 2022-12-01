import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../persistence/Persistence";

/**We can think of the signature as a function that receives a store, an action
 * and a 'next' function that can forward actions on to the rest of redux.
 */
export const fbMiddleware = (store) => (next) => (action) => {
  if (action.type === "SIGNUP") {
    //Sign up
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
      //const auth = getAuth(app);
      createUserWithEmailAndPassword(
        auth,
        inputUserData.email,
        inputUserData.password
      )
        .then((userCredential) => {
          //Logged in at this point!
          const user = userCredential.user;
          store.dispatch({
            type: "SIGNUP_RESULTS",
            payload: {
              loading: false,
              error: null,
              data: user,
            },
          });
          //examples https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-middleware-to-enable-async-logic
        })
        .catch((err) => {
          //Perhaps double-check that the catch works...
          store.dispatch({
            type: "SIGNUP_RESULTS",
            payload: { loading: false, error: err, data: null },
          });
        });
    }
  } else if (action.type === "LOGIN") {
    const inputUserData = action.payload;
    if (inputUserData) {
      store.dispatch({
        type: "LOGIN_RESULTS",
        payload: {
          loading: true,
          data: null,
          error: null,
        },
      });
      //const auth = getAuth(app);
      signInWithEmailAndPassword(
        auth,
        inputUserData.email,
        inputUserData.password
      )
        .then((userCredential) => {
          //Logged in at this point!
          const user = userCredential.user;
          store.dispatch({
            type: "LOGIN_RESULTS",
            payload: {
              loading: false,
              error: null,
              data: user,
            },
          });
        })
        .catch((err) => {
          store.dispatch({
            type: "LOGIN_RESULTS",
            payload: { loading: false, error: err, data: null },
          });
        });
    }
  } else if (action.type === "LOGOUT") {
    store.dispatch({
      type: "LOGOUT_RESULTS",
      payload: {
        loading: true,
        data: null,
        error: null,
      },
    });
    //const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        //Logged out here!
        store.dispatch({
          type: "LOGOUT_RESULTS",
          payload: {
            loading: false,
            error: null,
            data: null,
          },
        });
      })
      .catch((err) => {
        store.dispatch({
          type: "LOGOUT_RESULTS",
          payload: { loading: false, error: err, data: null },
        });
      });
  }

  return next(action); //Pass the action to the next function in the middleware chain.
};
