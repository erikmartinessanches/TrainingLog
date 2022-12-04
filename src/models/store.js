import { configureStore } from "@reduxjs/toolkit";
import { fbMiddleware } from "./middleware";
import { reducer } from "./reducers";
import thunkMiddleware from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
//import { createStore, applyMiddleware } from "redux";
import { SaveNewRecord } from "./ThunkFunctions";

//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore({
  reducer: reducer,
  middleware: [fbMiddleware, thunkMiddleware],
  preloadedState: { user: null, records: [] },
  //enhancers: [composedEnhancer],
});

//const store = createStore(reducer, composedEnhancer);

export default store;
