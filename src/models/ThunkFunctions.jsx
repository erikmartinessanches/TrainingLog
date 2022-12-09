import { set, ref } from "firebase/database";
import { database } from "../persistence/Persistence";
import { uuidv4 } from "@firebase/util";

export function SaveNewRecord(text) {
  //We want to return the async thunk function.

  return async function SaveNewRecordThunk(dispatch, getState) {
    const userId = getState().user.data.uid;
    /**TODO See this link about how to get a new record key from firebase.
     * https://github.com/firebase/quickstart-js/blob/master/database/scripts/main.js
    */
    const newRecordId = uuidv4();
    const REF = `users/${userId}/records/${newRecordId}`;
    const initialRecord = { text: text };

    /* Using set() overwrites data at the specified location, including any child 
    nodes. See if this data organization makes sense. */
    await set(ref(database, REF), initialRecord );

    dispatch({ type: "RECORD_CREATED", payload: { ...initialRecord, recordId: newRecordId} });
  };
}
