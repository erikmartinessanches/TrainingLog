import { React, useState, useRef } from "react";
import CreateRecordView from "../views/CreateRecordView";

function CreateRecordPresenter() {
  const [record, setRecord] = useState({ recordText: "" });
  const recordRef = useRef(""); //For uncontrolled inputs.

  function saveRecordTextACB(recordText) {
    console.log(`Save record text: ${recordText}`);
  }
  return (
    <CreateRecordView
      saveRecordTextACB={saveRecordTextACB}
      record={record}
      recordRef={recordRef}
    />
  );
}

export default CreateRecordPresenter;
