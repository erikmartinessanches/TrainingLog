import { set, ref, getDatabase } from "firebase/database";
import React from "react";
import { database } from "../persistence/Persistence";

export function SaveNewRecord(text) {
  //We want to return the async thunk function.

  return async function SaveNewRecordThunk(dispatch, getState) {
    // debugger;
    console.log("inside thunk");
    const db = getDatabase();
    const REF = "users";
    const initialRecord = { text };
    //    const response = await database
    //      .ref(REF + "/user/records")
    //      .set({ record: initialRecord });
    const response = await set(ref(db, "records"), { record: initialRecord });
    dispatch({ type: "RECORD_CREATED", payload: response.record });
  };
}
