import {
  createAsyncThunk,
  createSelector,
  createSlice,
  createAction,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "../persistence/firebaseModel";
import produce from "immer";

export const logoutAction = createAction("logoutAction");

const initialState = {
  user: {
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    exercises: {},
  },
  // Whether the model is ready to be used/observed. Save to persistance only if
  // the model is ready:
  modelReady: false,
  firebaseAuthStatus: "IDLE", //Is IDLE, PENDING, REJECTED or FULFILLED.
  firebaseAuthError: "",
  loggedOut: false,
};

export const user = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFirebaseAuthReady(state, action) {
      state.firebaseAuthReady = true;
    },
    setModelReady: (state, action) => {
      state.modelReady = action.payload;
    },
    registrationCompleted: (state, action) => {},
    loginCompleted: (state, action) => {},
    createExercise: (state, action) => {
      //debugger;
      state.user.exercises = produce(state.user.exercises, (draftState) => {
        draftState[`${action.payload.exerciseId}`] = {
          exerciseName: action.payload.exerciseName,
          exerciseType: action.payload.exerciseType,
        };
      });
    },
    createResistanceExercise: (state, action) => {
      state.user.resistanceExercises.push({
        name: action.payload.exerciseName,
      });
    },
    setExercises: (state, action) => {
      state.user.exercises = action.payload;
    },
    setFirstName: (state, action) => {
      state.user.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.user.lastName = action.payload;
    },
    logInUser: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
    },
    setLoggedOut: (state, action) => {
      state.loggedOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrLogIn.fulfilled, (state, action) => {
      if (action.payload?.firstName) {
        //On registration only
        state.user.firstName = action.payload?.firstName;
      }
      if (action.payload?.lastName) {
        //On registration only
        state.user.lastName = action.payload?.lastName;
      }
      state.firebaseAuthStatus = "FULFILLED";
    });
    builder.addCase(registerOrLogIn.pending, (state) => {
      state.firebaseAuthStatus = "PENDING";
    });
    builder.addCase(registerOrLogIn.rejected, (state, action) => {
      state.firebaseAuthStatus = "REJECTED";
      state.firebaseAuthError = action.error.code;
    });
    builder.addCase(logoutAction, () => {
      return initialState;
    });
  },
});

//Considered moving this to the Persistence layer. Keeping it here for now since
//this function is used from a presenter.
export const registerOrLogIn = createAsyncThunk(
  "auth/authenticateWithFirebase",
  async ({ email, password, signUpOption, firstName, lastName }) => {
    const auth = getAuth(firebaseApp);
    try {
      if (signUpOption) {
        const authUserData = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return {
          uid: authUserData.user.uid,
          email: authUserData.user.email,
          usingAsSignUp: signUpOption,
          firstName: firstName,
          lastName: lastName,
        };
      } else {
        const authUserData = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return {
          uid: authUserData.user.uid,
          email: authUserData.user.email,
          usingAsSignUp: signUpOption,
          firstName: firstName, //This is null, no first name on login
          lastName: lastName, //This is null, no last name on login
        };
      }
    } catch (e) {
      switch (
        e.code //For illustration but need not be handled here.
      ) {
        case "auth/email-already-in-use":
          console.log("Email address already in use.");
          break;
        case "auth/invalid-login-credentials":
          console.log("Invalid login credentials.");
          break;
        default:
          console.log("error.code");
          break;
      }
    }
  }
);
//Interestingly, it is possible to create my own selectors.
export const selectAuth = (state) => state.auth;
export const selectUser = createSelector(selectAuth, (data) => data.user);
export const selectFirebaseAuthStatus = createSelector(
  selectAuth,
  (data) => data.firebaseAuthStatus
);
export const selectModelReady = createSelector(
  selectAuth,
  (data) => data.modelReady
);
export const selectLoggedOut = createSelector(
  selectAuth,
  (data) => data.loggedOut
);

export const logoutNow = (state) => async (dispatch, _) => {
  dispatch(setLoggedOut(true));
  await signOut(getAuth(firebaseApp));
};

export const {
  setFirstName,
  setLastName,
  loginCompleted,
  registrationCompleted,
  createResistanceExercise,
  setAuthFulfilled,
  logInUser,
  setModelReady,
  setExercises,
  createExercise,
  setLoggedOut,
} = user.actions;
