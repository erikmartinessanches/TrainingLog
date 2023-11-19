import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
//import { fbMiddleware } from "./middleware";
//import { reducer } from "./reducers";
import thunkMiddleware from "redux-thunk";
import {
  user,
  listenToAuthChanges,
  registerOrLogIn,
  registrationCompleted,
} from "./userSlice";
import {
  Persistence,
  configureListenerMiddleware,
} from "../persistence/firebaseModel";
//import { setupListeners } from "@reduxjs/toolkit/query";
//import { firebaseApi } from "../persistence/apiSlices";

//Consider moving this to the Persistence layer.
const listenerMiddleware = configureListenerMiddleware();

const store = configureStore({
  reducer: {
    auth: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
//setupListeners(store.dispatch);

Persistence(store);
export default store;
