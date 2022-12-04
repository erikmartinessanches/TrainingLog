import { set, ref, getDatabase } from "firebase/database";
import React from "react";
import { database } from "../persistence/Persistence";

export function SaveNewRecord(text) {
  //We want to return the async thunk function.

  return async function SaveNewRecordThunk(dispatch, getState) {
    const yo = getState();
    debugger;
    console.log("inside thunk");
    const db = getDatabase();
    const REF = "users";
    const initialRecord = { text: text };
    //    const response = await database
    //      .ref(REF + "/user/records")
    //      .set({ record: initialRecord });
    await set(ref(database, "records"), { record: initialRecord });
    //debugger;
    dispatch({ type: "RECORD_CREATED", payload: initialRecord });
  };
}
