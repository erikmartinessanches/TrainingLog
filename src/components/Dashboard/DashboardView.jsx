import React from "react";
import Button from "@mui/material/Button";

function DashboardView({ logOut, loading, createNewACB }) {
  function onLogOutClicked() {
    logOut();
  }

  function onCreateNewRecord() {
    createNewACB();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        variant="contained"
        onClick={onLogOutClicked}
        type="submit"
        disabled={loading}
      >
        Log out
      </Button>
      <Button
        variant="contained"
        onClick={onCreateNewRecord}
        type="submit"
        disabled={loading}
      >
        Create new record
      </Button>
    </div>
  );
}

export default DashboardView;
