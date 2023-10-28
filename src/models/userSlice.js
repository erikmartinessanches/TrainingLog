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
    //cardioExercises: [],
  },
  firebaseAuthReady: false,
  firebaseReady: false, 
  // Whether the model is ready to be used/observed. Save to persistance only if
  //the model is ready:
  modelReady: false, 
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
      state.firebaseReady = action.payload;
    },
    setModelReady: (state, action) => {
      state.modelReady = action.payload;
    },
    setRegistrationCompletedStatus: (state, action) => {
      state.registrationCompleted = action.payload.ex;
    },
    createResistanceExercise: (state, action) => {
        //state.user.resistanceExercises = {...state.user.resistanceExercises, ...action.payload};
      state.user.resistanceExercises.push({name: action.payload.exerciseName})
    },
    setRecords: (state, action) => {
      state.user.records = action.payload;
    },
    setFirstName: (state, action) => {
      state.user.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.user.lastName = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user.uid = action.payload.uid;
     // state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      if (action.payload.usingAsSignUp) {
        state.registrationCompleted = true;
      }
      if (action.payload.firstName) {
        state.user.firstName = action.payload.firstName;
      }
      if (action.payload.lastName) {
        state.user.lastName = action.payload.lastName;
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
    builder.addCase(logoutAction, () => {
      //debugger;
      return initialState;
    });
    //builder.addDefaultCase((state, action) => {});
  },
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ usingAsSignUp, email, password, firstName, lastName }) => {
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
        firstName: firstName,
        lastName: lastName,
      };

    return {
      uid: authenticatedUserCredentials.user.uid,
      email: authenticatedUserCredentials.user.email,
      usingAsSignUp: usingAsSignUp,
      firstName: firstName,
      lastName: lastName,
    };
  }
);

//Model should not really know about persistence, move?
export const listenToAuthChanges = () => (dispatch, _) => {
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see https://firebase.google.com/docs/auth/web/start
    // and https://firebase.google.com/docs/auth/web/manage-users.
      dispatch (setLoggedInUser({uid: user.uid, email: user.email}));
      //See if we can use the existing extra reducer instead of setLoggedInUser?
    } else {
      //debugger;
      //We're logging out (or not logged in) and may set initial state here.
      //However, this causes logoutAction to be called on login.
      //dispatch (setLoggedInUser({uid: null, email: null, records: []}));
      //Remove firebase listeners (that change the model when FB notifies).
      dispatch(logoutAction());
    }
    dispatch(setFirebaseAuthReady());
    
  })
}

//Interestingly, it is possible to create my own selectors.

//export default user.reducer;
const selectAuth = (state) => state.auth;
export const selectUser = createSelector(selectAuth, (data) => data.user);

export const selectFirebaseAuthReady = createSelector(
  selectAuth,
  (data) => data.firebaseAuthReady
);
export const selectModelReady = createSelector(
  selectAuth,
  (data) => data.modelReady
);

export const logoutNow = (state) => (dispatch, _) => {
  //Perhaps prefer it here after all, in order to avoid calling this in login.
  //dispatch(logoutAction()); 
  signOut(getAuth(firebaseApp));
}


export const {
  setFirstName,
  setLastName,
  setFirebaseAuthReady,
  setFirebaseReady,
  setRegistrationCompletedStatus,
  createResistanceExercise,
  setAuthFulfilled,
  setLoggedInUser,
  setModelReady,
  setRecords,
} = user.actions;
