//import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded, getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  setFirebaseReady,
  setRegistrationCompletedStatus,
} from "../models/userSlice";
//import usersPersister from "./persisters/usersPersister";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../models/store";



export const persistence = function name(store, fireBaseApp) {
  let previousState = store.getState();
  const dispatch = store.dispatch;
  const firebaseDb = getDatabase(fireBaseApp);

  store.subscribe(() => {
    const state = store.getState();
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

function firebaseModelPromise() {}

export function updateModelFromFirebase(dispatch, userId) {
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
export function updateFirebaseFromModel() {}

// Remember to uncomment the following line:
// export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
