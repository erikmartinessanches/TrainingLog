import { set, ref, push } from "firebase/database";
import { database } from "../persistence/Persistence";

export function SaveNewRecord(text) {
  //We want to return the async thunk function.

  return async function SaveNewRecordThunk(dispatch, getState) {
    const userId = getState().user.data.uid;
    const REF = `users/${userId}/records`;
    const newRecord = { text: text };
    /**We're obtaining the new id or 'key' for the next inserted item from
     * firebase. Here we essentially say: Push() to the reference provided, but
     * if we don't provide a value, as seen here, nothing will be written to the
     * db and the child remains empty. We can use the reference to the child to,
     * for example, get the new key. */
    const newRecordId = push(ref(database, REF)).key;
    debugger;
    //push(ref(database, REF), initialRecord);
    /* Using set() overwrites data at the specified location, including any child 
    nodes. See if this data organization makes sense. */
    await set(ref(database, `${REF}/${newRecordId}`), newRecord);

    dispatch({
      type: "RECORD_CREATED",
      payload: { ...newRecord, recordId: newRecordId },
    });
  };
}
