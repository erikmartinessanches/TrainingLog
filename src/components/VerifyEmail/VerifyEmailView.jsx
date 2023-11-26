//import React from "react";
import Button from "@mui/material/Button";

const VerifyEmailView = ({ logOut }) => {
  function onLogOutClicked() {
    logOut();
  }
  return (
    <div>
      <h2>
        Please verify your email address before using Training Log. Click the
        link sent to your email.
      </h2>
      <Button
        variant="contained"
        onClick={onLogOutClicked}
        type="submit"
        // disabled={loading}
      >
        Log out
      </Button>
    </div>
  );
};

export default VerifyEmailView;
