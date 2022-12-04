import { set, ref } from "firebase/database";
import { database } from "../persistence/Persistence";

export function SaveNewRecord(text) {
  //We want to return the async thunk function.

  return async function SaveNewRecordThunk(dispatch, getState) {
    const userId = getState().user.data.uid;
    const REF = `users/${userId}`;
    const initialRecord = { text: text };
    //    const response = await database
    //      .ref(REF + "/user/records")
    //      .set({ record: initialRecord });
    await set(ref(database, `${REF}/records`), { record: initialRecord });
    // TODO see if we can add multiple children to 'records' without a "title"
    // but with automatic recordId perhaps?

    //TODO: Fix payload below, if needed.
    dispatch({ type: "RECORD_CREATED", payload: initialRecord });
  };
}
