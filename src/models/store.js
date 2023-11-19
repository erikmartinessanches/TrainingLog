import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { user } from "./userSlice";
import {
  Persistence,
  configureListenerMiddleware,
} from "../persistence/firebaseModel";

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
