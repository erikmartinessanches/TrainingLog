import { configureStore } from "@reduxjs/toolkit";
//import { fbMiddleware } from "./middleware";
import { initializeApp } from "firebase/app";
//import { reducer } from "./reducers";
//import thunkMiddleware from "redux-thunk";
import { firebaseConfig } from "../firebaseConfig";
import { user } from "./userSlice";
import { persistence } from "../persistence/firebaseModel";

export const firebaseApp = initializeApp(firebaseConfig);

const store = configureStore({
  reducer: {
    auth: user.reducer,
  },
  //middleware: [fbMiddleware, thunkMiddleware],
  //preloadedState: { user: null, records: [] }, //Probably don't need to init these...
  //enhancers: [composedEnhancer],
  devTools: true,
});

//store.dispatch(listenToAuthenticationChanges());

persistence(store, firebaseApp);
export default store;
