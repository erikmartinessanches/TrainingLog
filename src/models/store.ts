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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;
