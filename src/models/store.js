import { configureStore } from "@reduxjs/toolkit";
import { user } from "./userSlice";
import {
  connectModelToFirebase,
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

connectModelToFirebase(store);
export default store;
