import {
  createAsyncThunk,
  createSelector,
  createSlice,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  //getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
//import { firebaseApp } from '../persistence/firebaseModel';
import produce from 'immer';
import { RootState, AppDispatch } from './store';
import { continuationUrlDomain } from '../utils/utils';

import { auth, provider } from '../persistence/firebaseModel';
import { FirebaseError } from 'firebase/app';

export const logoutAction = createAction('logoutAction');

interface InitialState {
  user: {
    uid: null | string;
    firstName: null | string;
    lastName: null | string;
    email: null | string;
    exercises: {};
  };
  modelReady: boolean;
  firebaseAuthStatus: string;
  firebaseAuthError: undefined | string;
  loggedOut: boolean;
}

const initialState: InitialState = {
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
  firebaseAuthStatus: 'IDLE', //Is IDLE, PENDING, REJECTED or FULFILLED.
  firebaseAuthError: '',
  loggedOut: false,
};

export const user = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setModelReady: (state, action: PayloadAction<boolean>) => {
      state.modelReady = action.payload;
    },
    loginCompleted: (state, action) => {},
    loggedInWithProvider: (state, action) => {},
    createExercise: (state, action) => {
      //debugger;
      state.user.exercises = produce(state.user.exercises, (draftState) => {
        draftState[`${action.payload.exerciseId}`] = {
          exerciseName: action.payload.exerciseName,
          exerciseType: action.payload.exerciseType,
        };
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
      state.firebaseAuthStatus = 'FULFILLED';
    });
    builder.addCase(registerOrLogIn.pending, (state) => {
      state.firebaseAuthStatus = 'PENDING';
    });
    builder.addCase(registerOrLogIn.rejected, (state, action) => {
      state.firebaseAuthStatus = 'REJECTED';
      state.firebaseAuthError = action.error.code;
    });
    builder.addCase(logoutAction, () => {
      return initialState;
    });
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.firebaseAuthStatus = 'PENDING';
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.firebaseAuthStatus = 'REJECTED';
      state.firebaseAuthError = action.error.code;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      if (action.payload?.firstName) {
        //On registration only
        state.user.firstName = action.payload?.firstName;
      }
      if (action.payload?.lastName) {
        //On registration only
        state.user.lastName = action.payload?.lastName;
      }
      state.firebaseAuthStatus = 'FULFILLED';
    });
    // builder.addCase(handleRedirectResult.fulfilled, (state, action) => {
    //   debugger;
    //   if (action.payload?.firstName) {
    //     //On registration only
    //     state.user.firstName = action.payload?.firstName;
    //   }
    //   if (action.payload?.lastName) {
    //     //On registration only
    //state.user.firstName = action.payload.displayName;
    //   state.firebaseAuthStatus = 'FULFILLED';
    // });
    // builder.addCase(handleRedirectResult.rejected, (state, action) => {
    //   debugger;
    //   state.firebaseAuthStatus = 'REJECTED';
    //   state.firebaseAuthError = action?.error?.message;
    // });
    // builder.addCase(handleRedirectResult.pending, (state) => {
    //   debugger;
    //   state.firebaseAuthStatus = 'PENDING';
    // });
  },
});

interface RegisterProps {
  email: string;
  password: string;
  signUpOption: boolean;
  firstName: string;
  lastName: string;
}

interface ProviderProps {
  provider: string;
  authProvider: any;
  contents: any;
}

//Considered moving this to the Persistence layer. Keeping it here for now since
//this function is used from a presenter.
export const registerOrLogIn = createAsyncThunk(
  'auth/authenticateWithFirebase',
  async ({
    email,
    password,
    signUpOption,
    firstName,
    lastName,
  }: RegisterProps) => {
    try {
      if (signUpOption) {
        const authUserData = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        sendEmailVerification(auth.currentUser, {
          url: `${continuationUrlDomain()}/dashboard`,
        })
          .then(() => {
            console.log('Email verification sent!');
            // ...
            updateProfile(auth.currentUser, {
              displayName: firstName,
            }).then(() => {
              console.log('changed?');
              console.log(auth.currentUser);
            });
          })

          .catch((error) => {
            // An error occurred
            // ...
          });
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
          password,
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
        case 'auth/email-already-in-use':
          console.log('Email address already in use.');
          break;
        case 'auth/invalid-credential':
          console.log(e.message);
          break;
        default:
          console.log(e.code);
          break;
      }
    }
  },
);
//Interestingly, it is possible to create my own selectors.
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = createSelector(selectAuth, (data) => data.user);
export const selectFirebaseAuthStatus = createSelector(
  selectAuth,
  (data) => data.firebaseAuthStatus,
);
export const selectModelReady = createSelector(
  selectAuth,
  (data) => data.modelReady,
);
export const selectLoggedOut = createSelector(
  selectAuth,
  (data) => data.loggedOut,
);

export const logoutNow =
  (/* state: RootState */) => async (dispatch: AppDispatch, _) => {
    dispatch(setLoggedOut(true));
    await signOut(auth);
  };

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        //usingAsSignUp: signUpOption,
        firstName: user.displayName,
        lastName: user.displayName,
        createdAt: user.metadata.createdAt,
        creationTime: user.metadata.creationTime,
      };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      switch (
        errorCode //For illustration but need not be handled here.
      ) {
        case 'auth/email-already-in-use':
          console.log(errorMessage);
          break;
        case 'auth/invalid-login-credentials':
          console.log(errorMessage);
          break;
        default:
          console.log('error.code');
          break;
      }
    }
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     debugger;
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;

    //     return {
    //       uid: user.uid,
    //       email: user.email,
    //       //usingAsSignUp: signUpOption,
    //       firstName: user.displayName,
    //       lastName: user.displayName,
    //     };
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     switch (
    //       errorCode //For illustration but need not be handled here.
    //     ) {
    //       case 'auth/email-already-in-use':
    //         console.log(errorMessage);
    //         break;
    //       case 'auth/invalid-login-credentials':
    //         console.log(errorMessage);
    //         break;
    //       default:
    //         console.log('error.code');
    //         break;
    //     }
    //   });
  },
);

//Perhaps ok
// export const handleRedirectResult = createAsyncThunk(
//   'auth/handleRedirectResult',
//   async () => {
//     debugger;
//     const result = await getRedirectResult(auth);
//     if (result) {
//       return { user: result.user };
//     } else {
//       throw new Error('No user found after redirect');
//     }
//   },
// );

// export const signInWithGoogle = () => async (dispatch: AppDispatch, _) => {
//   const provider = new GoogleAuthProvider();
//   dispatch(setModelReady(false));
//   try {
//     await signInWithRedirect(auth, provider); // Starts redirect
//   } catch (error) {
//     //dispatch(setError(error.message));
//     console.log('error.message');
//   }
// };

export const {
  setFirstName,
  setLastName,
  loginCompleted,
  logInUser,
  setModelReady,
  setExercises,
  createExercise,
  setLoggedOut,
  loggedInWithProvider,
} = user.actions;
