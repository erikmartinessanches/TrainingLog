import React from "react";
import Button from "@mui/material/Button";

function DashboardView({ logOut, loading }) {
  function onLogOutClicked() {
    logOut();
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
    </div>
  );
}

export default DashboardView;
