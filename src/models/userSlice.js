import {
  createAsyncThunk,
  createSelector,
  createSlice,
  createAction,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { firebaseApp } from "../persistence/firebaseModel";

const logoutAction = createAction("logoutAction");

const initialState = {
  user: {
    uid: undefined,
    firstName: null,
    lastName: null,
    email: null,
    exercises: {},
  },
  //firebaseAuthReady: false,
  //firebaseReady: false,
  // Whether the model is ready to be used/observed. Save to persistance only if
  //the model is ready:
  modelReady: false,
  //registrationCompleted: false,

  firebaseAuthStatus: "IDLE", //(IDLE, PENDING, REJECTED or FULFILLED)
  //   requestId: null,
  firebaseAuthError: "",
};

export const user = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFirebaseAuthReady(state, action) {
      state.firebaseAuthReady = true;
    },
    // setFirebaseReady: (state, action) => {
    //   state.firebaseReady = action.payload;
    // },
    setModelReady: (state, action) => {
      state.modelReady = action.payload;
    },
    registrationCompleted: (state, action) => {
      //state.registrationCompleted = action.payload;
    },
    loginCompleted: (state, action) => {
      //state.registrationCompleted = action.payload;
    },
    createExercise: (state, action) => {
      state.user.exercises = state.user.exercises[action.payload.exerciseId] =
        action.payload.newRecord;
    },
    createResistanceExercise: (state, action) => {
      //state.user.resistanceExercises = {...state.user.resistanceExercises, ...action.payload};
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
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrLogIn.fulfilled, (state, action) => {
      //The below is set by onAuthStateChanged, so here I only set "additional
      //custom state" ib registration/login.
      //state.user.uid = action.payload?.uid;
      // state.user.name = action.payload.name;
      //state.user.email = action.payload?.email;
      //state.firebaseAuthReady = true;
      //if (action.payload?.usingAsSignUp) {
      //state.registrationCompleted = true;
      //}
      //debugger;
      if (action.payload?.firstName) {
        // debugger;
        state.user.firstName = action.payload?.firstName;
      }
      if (action.payload?.lastName) {
        // debugger;
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
      //debugger;
      return initialState;
    });
    //builder.addDefaultCase((state, action) => {});
  },
});

//Considered moving this to the Persistence layer. Keeping it here for now since
//this function is used from a presenter.
export const registerOrLogIn = createAsyncThunk(
  "auth/authenticateWithFirebase",
  async (
    { email, password, signUpOption, firstName, lastName },
    { dispatch, getState }
  ) => {
    try {
      if (signUpOption) {
        const authUserData = await createUserWithEmailAndPassword(
          getAuth(firebaseApp),
          email,
          password
        );
        const signInMethods = await fetchSignInMethodsForEmail(
          getAuth(firebaseApp),
          email
        );
        if (signInMethods.length > 0) {
          //debugger;
          //dispatch(registrationCompleted(true));
        }
        return {
          uid: authUserData.user.uid,
          email: authUserData.user.email,
          usingAsSignUp: signUpOption,
          firstName: firstName,
          lastName: lastName,
        };
      } else {
        const authUserData = await signInWithEmailAndPassword(
          getAuth(firebaseApp),
          email,
          password
        );
        //dispatch(loginCompleted(true));
        return {
          uid: authUserData.user.uid,
          email: authUserData.user.email,
          usingAsSignUp: signUpOption,
          firstName: firstName,
          lastName: lastName,
        };
      }
    } catch (e) {
      switch (
        e.code //For illustration but need not be handled here.
      ) {
        case "auth/email-already-in-use":
          console.log("Email address already in use.");
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

// export const selectFirebaseAuthReady = createSelector(
//   selectAuth,
//   (data) => data.firebaseAuthReady
// );
export const selectModelReady = createSelector(
  selectAuth,
  (data) => data.modelReady
);

export const logoutNow = (state) => (dispatch, _) => {
  //Perhaps prefer it here after all, in order to avoid calling this in login.
  //dispatch(logoutAction());
  signOut(getAuth(firebaseApp));
};

export const {
  setFirstName,
  setLastName,
  //setFirebaseAuthReady,
  loginCompleted,
  registrationCompleted,
  createResistanceExercise,
  setAuthFulfilled,
  logInUser,
  setModelReady,
  setExercises,
  createExercise,
} = user.actions;
