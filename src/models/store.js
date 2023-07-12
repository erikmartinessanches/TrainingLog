import { configureStore } from "@reduxjs/toolkit";
//import { fbMiddleware } from "./middleware";
import { initializeApp } from "firebase/app";
//import { reducer } from "./reducers";
//import thunkMiddleware from "redux-thunk";
import { firebaseConfig } from "../firebaseConfig";
import { user, listenToAuthChanges } from "./userSlice";
import { persistence } from "../persistence/firebaseModel";
//import { setupListeners } from "@reduxjs/toolkit/query";
//import { firebaseApi } from "../persistence/apiSlices";

export const firebaseApp = initializeApp(firebaseConfig);

const store = configureStore({
  reducer: {
    auth: user.reducer,
    //[firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()/* .concat(firebaseApi.middleware) */,
  //middleware: [fbMiddleware, thunkMiddleware],
  //preloadedState: { user: null, records: [] }, //Probably don't need to init these...
  //enhancers: [composedEnhancer],
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
//setupListeners(store.dispatch);
store.dispatch(listenToAuthChanges());

persistence(store, firebaseApp);
export default store;
