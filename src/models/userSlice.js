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
    uid: null,
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
    setRecords: (state, action) => {
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
      if (action.payload?.firstName) {
        state.user.firstName = action.payload?.firstName;
      }
      if (action.payload?.lastName) {
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

//Consider moving this to the Persistence layer.
export const registerOrLogIn = createAsyncThunk(
  "auth/authenticateWithFirebase",
  async (
    { email, password, signUpOption, firstName, lastName },
    { dispatch }
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
          dispatch(registrationCompleted(true));
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

//Model should not really know about persistence, move?
// export const listenToAuthChanges = () => (dispatch, _) => {
//   const auth = getAuth(firebaseApp);
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see https://firebase.google.com/docs/auth/web/start
//       // and https://firebase.google.com/docs/auth/web/manage-users.
//       dispatch(logInUser({ uid: user.uid, email: user.email }));
//       //See if we can use the existing extra reducer instead of setLoggedInUser?
//     } else {
//       //debugger;
//       //We're logging out (or not logged in) and may set initial state here.
//       //However, this causes logoutAction to be called on login.
//       //dispatch (setLoggedInUser({uid: null, email: null, records: []}));
//       //Remove firebase listeners (that change the model when FB notifies).
//       dispatch(logoutAction());
//     }
//     //dispatch(setFirebaseAuthReady());
//   });
// };

//Interestingly, it is possible to create my own selectors.

//export default user.reducer;
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
  //setFirebaseReady,
  registrationCompleted,
  createResistanceExercise,
  setAuthFulfilled,
  logInUser,
  setModelReady,
  setRecords,
  createExercise,
} = user.actions;
