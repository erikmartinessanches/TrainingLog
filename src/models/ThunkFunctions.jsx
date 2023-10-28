import { set, ref, push, getDatabase } from "firebase/database";
import { firebaseApp } from "../persistence/firebaseModel";
import { createExercise } from "./userSlice";
export function SaveNewRecord({exerciseName, exerciseType}) {
  //We want to return the async thunk function.

  return async function SaveNewRecordThunk(dispatch, getState) {
    //debugger;
    const userId = getState().auth.user.uid;
    const REF = `users/${userId}/exercises`;
    const newRecord = { exerciseName, exerciseType };
    const database = getDatabase(firebaseApp);
    /**We're obtaining the new id or 'key' for the next inserted item from
     * firebase. Here we essentially say: Push() to the reference provided, but
     * if we don't provide a value, as seen here, nothing will be written to the
     * db and the child remains empty. We can use the reference to the child to,
     * for example, get the new key. */
    //const newRecordId = push(ref(database, REF)).key;
    //push(ref(database, REF), newRecord); //actually saving data.

    /**There's a shorter way to do the above. Basically, push() will add on to
     * the list at the reference provided. The returned object can be used to
     * get at the newly created key. We'll use this newly created key by putting
     * they key in redux store together with the new record.
     */
    const newRecordReturned = await push(ref(database, `${REF}`), newRecord);

    //Not sure if it's wise to update store from here, I've therefore commented
    //out the following line. After all, we have the firebase listeners in a 
    //persistance observer where we should change the model.
    //dispatch(createExercise({ ...newRecord, exerciseId: newRecordReturned.key }))
    
  };
}

//Children can be updated through the update() method.
