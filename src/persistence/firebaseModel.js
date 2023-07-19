//import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded, getDatabase, get, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  setFirebaseReady,
  setRegistrationCompletedStatus,
  selectFirebaseAuthReady,
  setModelReady,
  selectModelReady,
  selectUser,
  createRecord,
  setRecords,
} from "../models/userSlice";
//import usersPersister from "./persisters/usersPersister";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseConfig } from "../firebaseConfig";
// import { firebaseApp } from "../models/store";

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export const Persistence = function name(store/* , fireBaseApp */) {
  let previousState = store.getState();
  const dispatch = store.dispatch;
  //const firebaseDb = getDatabase(fireBaseApp);


  store.subscribe(() => {
    const state = store.getState();
    //ReadFromFirebaseWithUser(state, dispatch);
    // const userId = state.auth.user.id;
    // const previousUserId = previousState.auth.user.id;
    // const registrationCompleted = state.auth.registrationCompleted;

    // if (userId && state.auth.firebaseReady) {
    //   usersPersister.toFirebase(firebaseDb, state, previousState);
    // }

    // if (registrationCompleted) {
    //   usersPersister.toFirebase(firebaseDb, state, previousState);
    //   dispatch(setRegistrationCompletedStatus(false));
    // }
  });

  previousState = store.getState();
};

//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);
//export const auth = getAuth(app);

const REF = "dinnerModel200-test3";
//const rf= ref(database, REF);
const firebaseNotify = "firebase_notify";

function FirebaseModelPromise() {
  //Set model ready to false.
  const dispatch = useDispatch();
  dispatch(setModelReady(false));
  //Get user data (records)

  //Then call PersistenceToModel()

  //Then set Model ready to true.

  //After we get the data for the model, we can add an observer to observe 
  //persistence. (Do not add the observer before model is ready. If we notify too
  //the observer may save to persistence.)
}

/**Tell FB we're going to have this model persisted. */
function connectModelToFirebase(params) {
  //addObserver

  //If model is ready then write to persistance.
}

async function PersistenceToModel(data) {
  const dispatch = useDispatch();
  //const records = await 
  debugger;
  dispatch(setRecords(data?.records))
}

 async function ReadFromFirebase(/* dispatch, userId */) {
  const dispatch = useDispatch();
  dispatch(setModelReady(false));
  const user = useSelector(selectUser);
  const snapshot = await get(child(ref(firebaseDb, "users"), user.uid))
  await PersistenceToModel(snapshot.val());
  dispatch(setModelReady(false));


  // TODO: Live update here.

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

 async function UpdateFirebaseFromModel() {

 }

 //TODO: Call this function somewhere!
 async function ReadFromFirebaseWithUser() {
  const firebaseAuthReady = useSelector(selectFirebaseAuthReady);
  if (firebaseAuthReady) {
    ReadFromFirebase();
  } else {
    //cancel live update
  }
 }

// Remember to uncomment the following line:
 export {FirebaseModelPromise, UpdateFirebaseFromModel, ReadFromFirebase, 
  ReadFromFirebaseWithUser, auth, firebaseApp};
