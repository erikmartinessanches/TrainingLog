import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { fbMiddleware } from "./middleware";
import { reducer } from "./reducers";

export const store = configureStore({
  reducer: reducer,
  middleware: [fbMiddleware],
  preloadedState: {}, //Starting with empty...
});
