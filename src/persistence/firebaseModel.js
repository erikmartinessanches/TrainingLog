import { initializeApp } from "firebase/app";
import {
  ref,
  getDatabase,
  get,
  set,
  child,
  onValue,
  off,
  onChildAdded,
  DataSnapshot,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  setModelReady,
  setExercises,
  setFirstName,
  setLastName,
  registerOrLogIn,
  logInUser,
  logoutAction,
  createExercise,
  selectModelReady,
} from "../models/userSlice";
import {
  createListenerMiddleware,
  isAnyOf,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
import { firebaseConfig } from "../firebaseConfig";
import useSelector from "react";

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

const configureListenerMiddleware = () => {
  const listenerMiddleware = createListenerMiddleware();

  listenerMiddleware.startListening({
    matcher: isAsyncThunkAction(registerOrLogIn),
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (
        action?.type === "auth/authenticateWithFirebase/fulfilled" &&
        action.payload.usingAsSignUp
      ) {
        saveUserToFirebase(state).then(() => {
          listenerApi.dispatch(setModelReady(true));
        });
      }
    },
  });

  listenerMiddleware.startListening({
    matcher: isAnyOf(setLastName),
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (state.auth.user?.uid && state.auth.firebaseAuthStatus !== "PENDING") {
        listenerApi.dispatch(setModelReady(true));
      }
    },
  });

  // listenerMiddleware.startListening({
  //   matcher: isAnyOf(logoutAction),
  //   effect: async (action, listenerApi) => {
  //     const previousState = listenerApi.getOriginalState();
  //     //Somehow make sure that removing listeners works as expected.
  //     off(ref(firebaseDb, `/users/${previousState.auth.user.uid}/lastName`));
  //     off(ref(firebaseDb, `/users/${previousState.auth.user.uid}/firstName`));
  //   },
  // });

  return listenerMiddleware;
};
export const connectModelToFirebase = (store) => {
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
        ref(firebaseDb, `/users/${store?.getState()?.auth?.user?.uid}/lastName`)
      );
      off(
        ref(
          firebaseDb,
          `/users/${store?.getState()?.auth?.user?.uid}/firstName`
        )
      );
      off(
        ref(
          firebaseDb,
          `/users/${store?.getState()?.auth?.user?.uid}/exercises`
        )
      );
      store.dispatch(logoutAction());
    }
  }
};

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
    child(ref(firebaseDb, "users"), state.auth.user.uid),
    modelToPersistence(state)
  );
}

function persistenceToModel(data, dispatch, store) {
  const mr = store.getState().auth.modelReady;
  if (data !== null) {
    //This works well for getting all exercises at once! CAn we make use of it
    //in a smart way, together with onChild added?
    if (data?.exercises) dispatch(setExercises(data?.exercises));

    if (data?.firstName) dispatch(setFirstName(data?.firstName));
    if (data?.lastName) dispatch(setLastName(data?.lastName));

    //This adds one exercise at a time.

    debugger;
    if (mr && data?.exerciseAdded) {
      dispatch(createExercise(data?.exerciseAdded));
    }
  }
}

function readFromFirebase(user, dispatch, store) {
  dispatch(setModelReady(false));
  get(child(ref(firebaseDb, "users"), user?.uid)).then((snapshot) => {
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
      store
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
  configureListenerMiddleware,
};
