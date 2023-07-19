import { configureStore } from "@reduxjs/toolkit";
//import { fbMiddleware } from "./middleware";
import { initializeApp } from "firebase/app";
//import { reducer } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { firebaseConfig } from "../firebaseConfig";
import { user, listenToAuthChanges } from "./userSlice";
import { Persistence } from "../persistence/firebaseModel";
//import { setupListeners } from "@reduxjs/toolkit/query";
//import { firebaseApi } from "../persistence/apiSlices";

//export const firebaseApp = initializeApp(firebaseConfig);

const store = configureStore({
  reducer: {
    auth: user.reducer,
    //[firebaseApi.reducerPath]: firebaseApi.reducer,
  },
 // middleware: [thunkMiddleware, (getDefaultMiddleware) =>
   // getDefaultMiddleware()]/* .concat(firebaseApi.middleware) */,
  //middleware: [ fbMiddleware,  thunkMiddleware],
  //preloadedState: { user: null, records: [] }, //Probably don't need to init these...
  //enhancers: [composedEnhancer],
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
//setupListeners(store.dispatch);

//This can perhaps be moved to FirebaseModel -> connectModelToFirebase.
store.dispatch(listenToAuthChanges());

Persistence(store/* , firebaseApp */);
export default store;
