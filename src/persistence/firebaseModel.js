import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import {
  ref,
  onChildAdded,
  getDatabase,
  get,
  set,
  child,
  push,
  off,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  selectFirebaseAuthReady,
  setModelReady,
  selectModelReady,
  selectUser,
  createRecord,
  setRecords,
  setFirstName,
  setLastName,
  selectAuth,
  registerOrLogIn,
  registrationCompleted,
  logInUser,
} from "../models/userSlice";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { firebaseConfig } from "../firebaseConfig";

const firebaseNotify = "firebase_notify";
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

const configureListenerMiddleware = () => {
  const listenerMiddleware = createListenerMiddleware();
  listenerMiddleware.startListening({
    matcher: isAnyOf(registrationCompleted),
    effect: async (action, listenerApi) => {
      console.log(`Signed up or registered but no user id yet!`);
      //debugger;
      if (await listenerApi.condition(registerOrLogIn)) {
        const state = listenerApi.getState();
        //debugger;
        console.log(`Registered and we have a user id now!`);
        //We are now able to write the appropriate data to firebase on registration only:
        saveUserToFirebase(state);
      }
      listenerApi.cancelActiveListeners();
    },
  });
  return listenerMiddleware;
};
export const Persistence = (store) => {
  onAuthStateChanged(auth, (user) => authChangedACB(user, store.dispatch));
  function authChangedACB(user, dispatch) {
    //debugger;
    if (user) {
      dispatch(logInUser({ uid: user.uid, email: user.email }));
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
  //debugger; //TODO return actually useful stuff to put into persistence from model.
  return {
    exercises: state?.auth.user.exercises,
    firstName: state.auth.user?.firstName,
    lastName: state.auth.user?.lastName,
  };
}

function saveUserToFirebase(state) {
  //debugger;
  //if (state?.auth.modelReady && state?.auth.user) {
  set(
    child(ref(firebaseDb, "users"), state.auth.user.uid),
    modelToPersistence(state)
  );
  // set(ref(firebaseDb, 'users/' + state.auth.user.uid), {
  //   yolo: "hiyo"
  // });
  // }
}

// function PersistenceToModel(data, dispatch) {
//   //debugger;
//   //We may not need this check if we set the records prop first thing on signup.
//   if (data?.exercises) dispatch(setRecords(data?.exercises));
//   if (data?.firstName !== null) dispatch(setFirstName(data?.firstName));
//   if (data?.lastName !== null) dispatch(setLastName(data?.lastName));
// }

// async function ReadFromFirebase(state, dispatch) {
//   dispatch(setModelReady(false));
//   //debugger;
//   const snapshot = await get(
//     child(ref(firebaseDb, "users"), state?.auth?.user?.uid)
//   );
//   PersistenceToModel(snapshot.val(), dispatch);
//   dispatch(setModelReady(true));

//   // todo: Live update here.

//   // firebase
//   //   .database()
//   //   .ref(REF + "/numberOfGuests")
//   //   .on("value", function guestsChangedInFirebaseACB(firebaseData) {
//   //     model.setNumberOfGuests(firebaseData.val());
//   //   });
//   // firebase
//   //   .database()
//   //   .ref(REF + "/currentDish")
//   //   .on("value", function currentDishChangedInFirebaseACB(firebaseData) {
//   //     model.setCurrentDish(firebaseData.val());
//   //   });
//   /*   console.log("Inside updateModelFromFirebase");
//   const recordsRef = ref(database, `users/${userId}/records`);
//   onChildAdded(recordsRef, (data) => {
//     const internalId = data.key;
//     const recordText = data.val().text;
//     //console.log(data.val()); //Record object without id.
//     dispatch({
//       type: "RECORD_CREATED",
//       payload: { text: recordText, recordId: internalId },
//     });
//   }); */
//   /*TODO Check that a record is not already in redux store in order to avoid
//   double entry into redux store. */
//   //dispatch({ type: "HI", payload: "Yo." });
//   // firebase
//   //   .database()
//   //   .ref(REF + "/dishes")
//   //   .on("child_added", function recordAddedInFirebaseACB(firebaseData) {
//   //     dispatch({
//   //       type: "RECORD_CREATED",
//   //       payload: { ...newRecord, recordId: newRecordReturned.key },
//   //     });
//   //   });
//   // firebase
//   //   .database()
//   //   .ref(REF + "/dishes")
//   //   .on("child_removed", function dishRemovedInFirebaseACB(firebaseData) {
//   //     model.removeFromMenu({ id: +firebaseData.key });
//   //   });
// }

// //TODO: Call this function somewhere!
// function ReadFromFirebaseWithUser(state, dispatch) {
//   //debugger;
//   if (state?.auth?.firebaseAuthReady && state?.auth?.user?.uid !== null) {
//     ReadFromFirebase(state, dispatch);
//     //TODO: Now it's just a matter of placing the firebase observer in the right place,
//     //Move this where to make it work?
//   } else {
//     //TODO cancel live update
//   }
// }

// Remember to uncomment the following line:
export {
  //FirebaseModelPromise,
  //modelToPersistence,
  //ReadFromFirebase,
  //ReadFromFirebaseWithUser,
  auth,
  firebaseApp,
  configureListenerMiddleware,
};
