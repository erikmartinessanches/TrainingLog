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
import { Persistence } from "../persistence/firebaseModel";
//import { setupListeners } from "@reduxjs/toolkit/query";
//import { firebaseApi } from "../persistence/apiSlices";

//Consider moving this to the Persistence layer.
const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(registrationCompleted),
  effect: async (action, listenerApi) => {
    console.log(`Signed up or registered but no user id yet!`);
    debugger;
    if (await listenerApi.condition(registerOrLogIn)) {
      const state = listenerApi.getState();
      debugger;
      console.log(`Registered and we have a user id now!`);
      //We are now able to write the appropriate data to firebase on registration only:
    }

    listenerApi.cancelActiveListeners();
  },
});

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
