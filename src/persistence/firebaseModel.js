import { initializeApp } from "firebase/app";
import { ref, getDatabase, get, set, child } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  setModelReady,
  setExercises,
  setFirstName,
  setLastName,
  registerOrLogIn,
  logInUser,
} from "../models/userSlice";
import {
  createListenerMiddleware,
  isAnyOf,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
import { firebaseConfig } from "../firebaseConfig";

const firebaseNotify = "firebase_notify";
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
        saveUserToFirebase(state);
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

  return listenerMiddleware;
};
export const connectModelToFirebase = (store) => {
  onAuthStateChanged(auth, (user) => authChangedACB(user, store.dispatch));

  function authChangedACB(user, dispatch) {
    if (user) {
      dispatch(logInUser({ uid: user.uid, email: user.email }));
      //Can we readFromFirebaseWithUser safely from here, on BOTH login and register?
      //Yes we can, brilliant! (Both logging and signup breaks here with a uid.)
      const state = store.getState();
      readFromFirebaseWithUser(user, dispatch, state);
    } else {
      //Once we have created callbacks, we can remove them by doing something like
      // off("users/" + store?.auth?.user?.uid);
    }
  }
};

// export const Persistence = function name(store) {
//   let previousState = store.getState();
//   const dispatch = store.dispatch;

//   store.subscribe(() => {
//     const state = store.getState();
//     const userId = state?.auth.user.uid;
//     //const registrationCompleted = state?.auth.registrationCompleted;

//     if (
//       userId &&
//       //registrationCompleted &&
//       state?.auth?.authenticate?.status === "FULFILLED"
//     ) {
//       //Just registered.
//       //debugger;
//       //Now store a new user in persistence with the relevant data.
//       //We should persist, for example, first name and last name.

//       //We should eventually setModelReady(true) once done.
//       //Perhaps also registrationCompleted to false?
//       //dispatch(setModelReady(true));
//       saveUserToFirebase(state);
//       //dispatch(setRegistrationCompletedStatus(false));
//       //dispatch(setFirebaseReady(true));
//     }

//     /*     if (!userId) {
//       unsubsriptions.forEach(unsubscription => unsubscription());
//     } */

//     if (
//       userId &&
//       //!registrationCompleted &&
//       state?.auth?.authenticate?.status === "FULFILLED"
//     ) {
//       //We logged in a registered user
//       //debugger;

//       if (!state?.auth.firebaseReady) {
//         //TODO link docs
//         //debugger;
//         dispatch(setFirebaseReady(true));

//         PersistExercise(state, previousState);
//         ReadFromFirebaseWithUser(state, dispatch);
//       }
//       if (
//         userId &&
//         state?.auth?.authenticate?.status === "FULFILLED" &&
//         state?.auth?.modelReady
//       ) {
//         console.log("model ready I think... add observer?");
//         debugger;
//         //This should change the store eventually.
//         onChildAdded(
//           ref(firebaseDb, `users/${state?.auth?.user?.uid}/exercises`),
//           (data) => {
//             console.log(
//               `Saw that child data changed. data: ${data.val().exerciseName}`
//             );
//           }
//         );
//         //Getting really close, now I'm reacting here to child added in firebase!
//         //Now it's just a matter of updating the store from here.
//       }
//       //dispatch(setFirebaseReady(true));
//       //unsubsriptions = [];
//     }
//     // const previousUserId = previousState.auth.user.id;
//     // const registrationCompleted = state.auth.registrationCompleted;

//     // if (userId && state.auth.firebaseReady) {

//     // }
//   });
//   previousState = store.getState();
// };
// function PersistExercise(state, previousState) {
//   //debugger;
//   if (state.auth.user.exercises !== previousState.auth.user.exercises) {
//     //debugger;
//     console.log("different");
//   }
// }

// function FirebaseModelPromise() {
//   //Set model ready to false.
//   const dispatch = useDispatch();
//   dispatch(setModelReady(false));
//   //Get user data (records)

//   //Then call PersistenceToModel()

//   //Then set Model ready to true.

//   //After we get the data for the model, we can add an observer to observe
//   //persistence. (Do not add the observer before model is ready. If we notify too
//   //the observer may save to persistence.)
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
    child(ref(firebaseDb, "users"), state.auth.user.uid),
    modelToPersistence(state)
  );
}

function persistenceToModel(data, dispatch) {
  //We may not need this check if we set the records prop first thing on signup.
  if (data !== null) {
    if (data?.exercises) dispatch(setExercises(data?.exercises));
    if (data?.firstName !== null) dispatch(setFirstName(data?.firstName));
    if (data?.lastName !== null) dispatch(setLastName(data?.lastName));
  }
}

function readFromFirebase(user, dispatch, state) {
  dispatch(setModelReady(false));
  get(child(ref(firebaseDb, "users"), user?.uid)).then((snapshot) => {
    persistenceToModel(snapshot.val(), dispatch);
  });

  //persistenceToModel(snapshot.val(), dispatch);

  // todo: Live update here.

  // firebase
  //   .database()
  //   .ref(REF + "/numberOfGuests")
  //   .on("value", function guestsChangedInFirebaseACB(firebaseData) {
  //     model.setNumberOfGuests(firebaseData.val());
  //   });
  // firebase
  //   .database()
  //   .ref(REF + "/currentDish")
  //   .on("value", function currentDishChangedInFirebaseACB(firebaseData) {
  //     model.setCurrentDish(firebaseData.val());
  //   });
  /*   console.log("Inside updateModelFromFirebase");
  const recordsRef = ref(database, `users/${userId}/records`);
  onChildAdded(recordsRef, (data) => {
    const internalId = data.key;
    const recordText = data.val().text;
    //console.log(data.val()); //Record object without id.
    dispatch({
      type: "RECORD_CREATED",
      payload: { text: recordText, recordId: internalId },
    });
  }); */
  /*TODO Check that a record is not already in redux store in order to avoid
  double entry into redux store. */
  //dispatch({ type: "HI", payload: "Yo." });
  // firebase
  //   .database()
  //   .ref(REF + "/dishes")
  //   .on("child_added", function recordAddedInFirebaseACB(firebaseData) {
  //     dispatch({
  //       type: "RECORD_CREATED",
  //       payload: { ...newRecord, recordId: newRecordReturned.key },
  //     });
  //   });
  // firebase
  //   .database()
  //   .ref(REF + "/dishes")
  //   .on("child_removed", function dishRemovedInFirebaseACB(firebaseData) {
  //     model.removeFromMenu({ id: +firebaseData.key });
  //   });
}

// //TODO: Call this function somewhere!
function readFromFirebaseWithUser(user, dispatch, state) {
  if (user?.uid) {
    readFromFirebase(user, dispatch, state);

    //TODO: Now it's just a matter of placing the firebase observer in the right place,
    //Move this where to make it work?
  } else {
    //TODO cancel live update
  }
}

// Remember to uncomment the following line:
export {
  //FirebaseModelPromise,
  //modelToPersistence,
  readFromFirebase,
  readFromFirebaseWithUser,
  auth,
  firebaseApp,
  configureListenerMiddleware,
};
