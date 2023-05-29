import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  //onAuthStateChanged,
  signInWithEmailAndPassword,
  //signOut,
} from "firebase/auth";
import { firebaseApp } from "./store";

const initialState = {
  user: {
    uid: null,
    name: null,
    email: null,
    records: [],
  },
  firebaseAuthReady: false,
  firebaseReady: false,
  registrationCompleted: false,
  authenticate: {
    status: "IDLE", //(IDLE, PENDING, REJECTED or FULFILLED)
    requestId: null,
    error: "",
  },
};

export const user = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFirebaseAuthReady(state, action) {
      state.firebaseAuthReady = true;
    },
    setFirebaseReady: (state, action) => {
      state.firebaseReady = true;
    },
    setRegistrationCompletedStatus: (state, action) => {
      state.registrationCompleted = action.payload;
    },
    createRecord: (state, action) => {
      state.user.records.push(action.payload);
    },
    setName: (state, action) => {
      state.user.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      if (action.payload.usingAsSignUp) {
        state.registrationCompleted = true;
      }
      state.authenticate.status = "FULFILLED";
    });
    builder.addCase(authenticate.pending, (state) => {
      state.authenticate.status = "PENDING";
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.authenticate.status = "REJECTED";
      state.authenticate.error = action.payload.error.code;
    });
  },
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ usingAsSignUp, email, password }) => {
    //Do we need the name for authentication?
    const auth = getAuth(firebaseApp);
    let authenticatedUserCredentials;

    try {
      if (usingAsSignUp) {
        authenticatedUserCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        authenticatedUserCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
    } catch (error) {
      throw error;
    }

    if (usingAsSignUp)
      return {
        uid: authenticatedUserCredentials.user.uid,
        email: authenticatedUserCredentials.user.email,
        usingAsSignUp: usingAsSignUp,
        // name: name,
      };

    return {
      uid: authenticatedUserCredentials.user.uid,
      email: authenticatedUserCredentials.user.email,
      usingAsSignUp: usingAsSignUp,
      //name: name,
    };
  }
);

//Interestingly, it is possible to create my own selectors.

//export default user.reducer;
const selectAuth = (state) => state.auth;
export const selectUser = createSelector(selectAuth, (data) => data.user);

export const selectFirebaseAuthReady = createSelector(
  selectAuth,
  (data) => data.firebaseAuthReady
);

export const {
  setName,
  setFirebaseAuthReady,
  setFirebaseReady,
  setRegistrationCompletedStatus,
  createRecord,
} = user.actions;
