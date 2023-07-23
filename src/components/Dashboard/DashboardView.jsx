import React from "react";
import Button from "@mui/material/Button";

function DashboardView({ logOut, loading, createNewACB, user }) {
  function onLogOutClicked() {
    logOut();
  }

  function onCreateNewRecord() {
    createNewACB();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.firstName} {user.lastName} {user?.email}</p>
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
