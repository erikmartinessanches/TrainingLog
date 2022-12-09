import { configureStore } from "@reduxjs/toolkit";
import { fbMiddleware } from "./middleware";
import { reducer } from "./reducers";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: reducer,
  middleware: [fbMiddleware, thunkMiddleware],
  preloadedState: { user: null, records: [] }, //Probably don't need to init these...
  //enhancers: [composedEnhancer],
});

export default store;
