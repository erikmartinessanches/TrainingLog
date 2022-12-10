import firebaseConfig from "../firebaseConfig";
import { database } from "../persistence/Persistence";
import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded } from "firebase/database";
//import { isDishInMenu } from "./utilities"; //We could perhaps re-use this one.

// export function firebaseModelPromise() {
//   return firebase
//     .database()
//     .ref(REF /* <-- note! Whole object! */)
//     .once("value") //Pretty sure this accesses FB and then gives the result to makeBigPromiseACB.
//     .then(makeBigPromiseACB);
// }

// function makeBigPromiseACB(firebaseData) {
//   //Return records instead of the DinnerModel.
//   if (firebaseData.val() === undefined || firebaseData.val() === {}) {
//     return {records: []}; //empty records[] since there is no model in FB.
//   }

//   function createModelACB(dishes) {
//     return new DinnerModel(firebaseData.val().numberOfGuests, dishes);
//   }
//   function makeDishPromiseCB(dishId) {
//     //return getDishDetails(dishId); //This returns a Promise.
//   }
//   let dishPromiseArray = [];
//   if (firebaseData.val().dishes !== undefined) {
//     /* Remember that map() returns a new array (it does not modify the array
//         it is invoked on) containing the values returned by the callback. */
//     dishPromiseArray = Object.keys(firebaseData.val().dishes).map(
//       makeDishPromiseCB
//     );
//   }
//   /* So dishPromiseArray is an array of promisees that we resolve (getting their
//      dish details) before we create the model. */
//   return Promise.all(dishPromiseArray).then(createModelACB);
// }

import React from "react";

function FirebaseModel() {
  const dispatch = useDispatch();
  console.log("Inside FirebaseModel");
  return <div>firebaseModel</div>;
}

export default FirebaseModel;

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
  console.log("Inside updateModelFromFirebase");
  const recordsRef = ref(database, `users/${userId}/records`);
  onChildAdded(recordsRef, (data) => {
    const internalId = data.key;
    const recordText = data.val().text;
    //console.log(data.val()); //Record object without id.
    dispatch({
      type: "RECORD_CREATED",
      payload: { text: recordText, recordId: internalId },
    });
  });
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

// Remember to uncomment the following line:
// export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
