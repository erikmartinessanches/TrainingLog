//import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded, getDatabase, get, set, child, push } from "firebase/database";
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
  setFirstName,
  setLastName,
} from "../models/userSlice";
//import usersPersister from "./persisters/usersPersister";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseConfig } from "../firebaseConfig";
// import { firebaseApp } from "../models/store";

const firebaseNotify = "firebase_notify";
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const REF = "dinnerModel200-test3";
//const rf= ref(database, REF);

export const Persistence = function name(store) {
  let previousState = store.getState();
  const dispatch = store.dispatch;
  let unsubsriptions = [];

  store.subscribe(() => {
    const state = store.getState();
    const userId = state?.auth.user.uid;
    const registrationCompleted = state?.auth.registrationCompleted;

    if (userId && registrationCompleted &&
      (state?.auth?.authenticate?.status === "FULFILLED")){ //Just registered.
      //debugger;
      //Now store a new user in persistence with the relevant data. 
      //We should persist, for example, first name and last name.

      //We should eventually setModelReady(true) once done.
      //Perhaps also registrationCompleted to false?
      //dispatch(setModelReady(true));
      saveUserToFirebase(state);
      dispatch(setRegistrationCompletedStatus(false));
      //dispatch(setFirebaseReady(true));
    }

    if (!userId) {
      unsubsriptions.forEach(unsubscription => unsubscription());
    }

    if (userId && !registrationCompleted && 
      (state?.auth?.authenticate?.status === "FULFILLED")) { //We logged in a registered user
      if (!state?.auth.firebaseReady) {
        //TODO link docs
        dispatch(setFirebaseReady(true));
        //debugger;
        ReadFromFirebaseWithUser(state, dispatch);
      }
        //dispatch(setFirebaseReady(true));
        //unsubsriptions = [];
    }
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

function modelToPersistence(state) {
  //debugger; //TODO return actually useful stuff to put into persistence from model.
    return {
      //records: state?.auth.user.records,
      firstName: state.auth.user?.firstName,
      lastName: state.auth.user?.lastName,
    }
}

function saveUserToFirebase(state) {
  //debugger;
  //if (state?.auth.modelReady && state?.auth.user) {
    set(child(ref(firebaseDb, "users"), state.auth.user.uid), modelToPersistence(state));
    // set(ref(firebaseDb, 'users/' + state.auth.user.uid), {
    //   yolo: "hiyo"
    // });
 // }
}

function PersistenceToModel(data, dispatch) {
  //debugger;
  //We may not need this check if we set the records prop first thing on signup.
  if(data?.records !== null) dispatch(setRecords(data?.records)); 
  if(data?.firstName !== null) dispatch(setFirstName(data?.firstName)); 
  if(data?.lastName !== null) dispatch(setLastName(data?.lastName)); 
}

 async function ReadFromFirebase(state,  dispatch) {
  dispatch(setModelReady(false));
  //debugger;
  const snapshot = await get(child(ref(firebaseDb, "users"), state?.auth?.user?.uid))
  PersistenceToModel(snapshot.val(), dispatch);
  dispatch(setModelReady(true));

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

 //TODO: Call this function somewhere!
function ReadFromFirebaseWithUser(state, dispatch) {
  //debugger;
  if (state?.auth?.firebaseAuthReady && state?.auth?.user?.uid !== null) {
    ReadFromFirebase(state, dispatch);
  } else {
    //TODO cancel live update
  }
 }

// Remember to uncomment the following line:
 export {FirebaseModelPromise, modelToPersistence, ReadFromFirebase, 
  ReadFromFirebaseWithUser, auth, firebaseApp};
