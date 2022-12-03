import { React, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function CreateRecordView({ saveRecordTextACB, record, recordRef }) {
  const tempRef = useRef();

  function onSubmitACB(e) {
    saveRecordTextACB(recordRef.current.value);
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmitACB}>
      <TextField
        id="outlined-multiline-static"
        label="Record text"
        multiline
        rows={4}
        defaultValue={record.recordText}
        inputRef={recordRef}
      />
      <Button
        variant="contained"
        type="submit"
        //disabled={loading}
      >
        Save new record
      </Button>
    </form>
  );
}

export default CreateRecordView;
