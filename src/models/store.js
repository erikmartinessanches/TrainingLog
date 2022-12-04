import { configureStore } from "@reduxjs/toolkit";
import { fbMiddleware } from "./middleware";
import { reducer } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import { SaveNewRecord } from "./ThunkFunctions";

//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore({
  reducer: reducer,
  middleware: [SaveNewRecord, fbMiddleware],
  preloadedState: { user: null, records: [] },
  //enhancers: [composedEnhancer],
});

export default store;
