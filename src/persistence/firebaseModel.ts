import { initializeApp } from 'firebase/app';
import {
  ref,
  getDatabase,
  get,
  set,
  child,
  onValue,
  off,
  onChildAdded,
} from 'firebase/database';
import {
  getAuth,
  onAuthStateChanged,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  setModelReady,
  setExercises,
  setFirstName,
  setLastName,
  registerOrLogIn,
  logInUser,
  logoutAction,
  createExercise,
  setLoggedOut,
  loginCompleted,
  loggedInWithProvider,
  signInWithGoogle,
} from '../models/userSlice';
import {
  createListenerMiddleware,
  isAnyOf,
  isAsyncThunkAction,
} from '@reduxjs/toolkit';

//import { env } from 'process';
//import { firebaseConfig } from "../firebaseConfig";
// console.log(`Hello from ${process.env.HELLO} environment!`)

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
});
const firebaseDb = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

const configureListenerMiddleware = () => {
  const listenerMiddleware = createListenerMiddleware();

  /**Application state side effect: When weMre done with our ‘registerOrLogIn’
   * thunk, create a user DF entry if this is signup.
   */
  listenerMiddleware.startListening({
    matcher: isAsyncThunkAction(registerOrLogIn),
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (
        action?.type === 'auth/authenticateWithFirebase/fulfilled' &&
        action?.payload?.usingAsSignUp
      ) {
        saveUserToFirebase(state).then(() => {
          listenerApi.dispatch(setModelReady(true));
        });
      }
    },
  });

  listenerMiddleware.startListening({
    matcher: isAsyncThunkAction(signInWithGoogle),
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (action?.type === 'auth/signInWithGoogle/fulfilled') {
        //TODO, SERIOUSLY: Only saveUserToFirebase if not already in DB! Otherwise,
        //google signup/login overwrites the DB user data entry from previous
        //google logins/sign-ups! I resolved the problem using the createdAt
        //meta info already present from firebase auth.
        if (Date.now() - action.payload.createdAt < 10000) {
          //User created less than 10 seconds ago? Likely a new user.
          saveUserToFirebase(state).then(() => {
            listenerApi.dispatch(setModelReady(true));
          });
        }
      }
    },
  });

  // /*Application state side effect: When we have logged in with a (google)
  // provider and I need to create database entry for the user. */
  // listenerMiddleware.startListening({
  //   matcher: isAnyOf(loggedInWithProvider),
  //   effect: async (action, listenerApi) => {
  //     //debugger;
  //     const state = listenerApi.getState();
  //     if (action?.type === 'auth/loggedInWithProvider') {
  //       //TODO: Only saveUserToFirebase if not already in DB! Otherwise,
  //       //subsequent logins overwrite the DB entry!
  //       saveUserToFirebase(state).then(() => {
  //         listenerApi.dispatch(setModelReady(true));
  //       });
  //     }
  //   },
  // });

  /**Application state side effect. TODO: Perhaps decouple setting last name from
   * triggering this side effect and use rather another action only for this
   * situation?
   */
  listenerMiddleware.startListening({
    matcher: isAnyOf(setLastName),
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();

      if (
        (state as any).auth.user?.uid &&
        (state as any).auth.firebaseAuthStatus !== 'PENDING'
      ) {
        listenerApi.dispatch(setModelReady(true));
      }
    },
  });

  /**Application state side effect. */
  listenerMiddleware.startListening({
    matcher: isAnyOf(createExercise),
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      //debugger;
      const REF = `users/${(state as any).auth.user.uid}/exercises`;
      const newExercise = {
        exerciseName: action.payload.exerciseName,
        exerciseType: action.payload.exerciseType,
      };
      await set(
        ref(firebaseDb, `${REF}/${action.payload.exerciseId}`),
        newExercise,
      );
    },
  });

  return listenerMiddleware;
};
export const connectModelToFirebase = async (store) => {
  onAuthStateChanged(auth, (user) => authChangedACB(user, store));

  function authChangedACB(user, store) {
    if (user) {
      store.dispatch(logInUser({ uid: user.uid, email: user.email }));
      //Can we readFromFirebaseWithUser safely from here, on BOTH login and register?
      //Yes we can, brilliant! (Both logging and signup breaks here with a uid.)
      readFromFirebaseWithUser(user, store.dispatch, store);
    } else {
      //We can remove callbacks once we have no user (logged out).
      off(
        ref(
          firebaseDb,
          `/users/${store?.getState()?.auth?.user?.uid}/lastName`,
        ),
      );
      off(
        ref(
          firebaseDb,
          `/users/${store?.getState()?.auth?.user?.uid}/firstName`,
        ),
      );
      off(
        ref(
          firebaseDb,
          `/users/${store?.getState()?.auth?.user?.uid}/exercises`,
        ),
      );

      store.dispatch(logoutAction());
      store.dispatch(setLoggedOut(true));
    }
  }

  /**Think of this as a similar callback to the onAuthStateChanged but for getting
   * the result after performing a Google login with redirect. We need to call
   * it after logging in. This function may not be needed, as signInWithRedirect
   * signs in by itself. But his is a way of getting results.
   */
  // getRedirectResult(auth)
  //   .then((result) => {
  //     debugger;
  //     if (result) {
  //       debugger;
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       const user = result.user;
  //     }
  // This gives you a Google Access Token. You can use it to access Google APIs.

  // let credential;
  // if (result) {
  //   credential = GoogleAuthProvider.credentialFromResult(result);
  //   const user = result?.user;
  //   debugger;
  // }
  // credential = GoogleAuthProvider.credentialFromResult(result);

  // const provider = new GoogleAuthProvider();

  //const credential = GoogleAuthProvider.credentialFromResult(result); //What’s this used for?
  //const user = result.user;
  //     // store.dispatch(logInUser({ uid: user.uid, email: user.email })); //Needed here?
  //     // store.dispatch(setFirstName(result._tokenResponse.firstName));
  //     // store.dispatch(setLastName(result._tokenResponse.lastName));
  //     // store.dispatch(loggedInWithProvider({ user: user }));
  //     //Now, save the user data to DB. (perhaps using the middleware listener), then
  //     //we can determine in the future whether this is a login/signup for the user.
  //     //Then try as above: readFromFirebaseWithUser(user, store.dispatch, store);
  // })
  // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData?.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
};

//This appears just before page reload, so use debugger to see variables (since)
//console is cleared. This function may not be necessary, gives access to Google's
//getRedirectResult.
// function getResults(auth) {
//   debugger;
//   console.log('Here we may access google auth login user result.');
//   getRedirectResult(auth)
//     .then((result) => {
//       const user = result.user;
//       console.log('user: ' + user);
//       debugger;
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
//   //debugger;
// }

function modelToPersistence(state) {
  //Return actually useful stuff to put into persistence from model.
  return {
    exercises: state?.auth.user.exercises,
    firstName: state.auth.user?.firstName,
    lastName: state.auth.user?.lastName,
  };
}

function saveUserToFirebase(state) {
  //if (state?.auth.modelReady && state?.auth.user) {
  return set(
    child(ref(firebaseDb, 'users'), state.auth.user.uid),
    modelToPersistence(state),
  );
}

function persistenceToModel(data, dispatch, store) {
  const modelReady = store.getState().auth.modelReady;

  if (data !== null) {
    //This works well for getting all exercises at once! CAn we make use of it
    //in a smart way, together with onChild added?
    if (data?.exercises) dispatch(setExercises(data?.exercises));

    if (data?.firstName) dispatch(setFirstName(data?.firstName));
    if (data?.lastName) dispatch(setLastName(data?.lastName));
    const exercisesInStore = store.getState().auth.user.exercises;
    //debugger;
    //This adds one exercise at a time, does not add if the exercise already exists.
    if (
      modelReady &&
      data?.exerciseAdded &&
      //Trying to avoid double action on the setting window. Perhaps the following
      // condition will work when/if I set store prior to persistence, so
      // probably using set() rather than push() to persistence.
      !exercisesInStore.hasOwnProperty(`${data?.exerciseAdded?.exerciseId}`)
    ) {
      dispatch(createExercise(data?.exerciseAdded));
    }
  }
}

function readFromFirebase(user, dispatch, store) {
  dispatch(setModelReady(false));
  get(child(ref(firebaseDb, 'users'), user?.uid)).then((snapshot) => {
    persistenceToModel(snapshot.val(), dispatch, store);
  });

  onValue(ref(firebaseDb, `/users/${user.uid}/firstName`), function (snapshot) {
    if (store.getState()?.auth?.modelReady) {
      persistenceToModel({ firstName: snapshot.val() }, dispatch, store);
    }
  });

  onValue(ref(firebaseDb, `/users/${user.uid}/lastName`), function (snapshot) {
    if (store.getState()?.auth?.modelReady) {
      persistenceToModel({ lastName: snapshot.val() }, dispatch, store);
    }
  });

  onChildAdded(ref(firebaseDb, `/users/${user.uid}/exercises`), (snapshot) => {
    persistenceToModel(
      {
        exerciseAdded: {
          exerciseId: snapshot.key,
          exerciseName: snapshot.val().exerciseName,
          exerciseType: snapshot.val().exerciseType,
        },
      },
      dispatch,
      store,
    );
  });
}

// //TODO: Call this function somewhere!
function readFromFirebaseWithUser(user, dispatch, store) {
  if (user?.uid) {
    readFromFirebase(user, dispatch, store);
  } else {
    //TODO cancel live update?
  }
}

// Remember to uncomment the following line:
export {
  //modelToPersistence,
  readFromFirebase,
  readFromFirebaseWithUser,
  auth,
  firebaseApp,
  provider,
  configureListenerMiddleware,
};
