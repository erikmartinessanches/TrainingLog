//import React from "react";
import Button from '@mui/material/Button';

interface Props {
  logOut: () => void;
  resend: () => void;
}

const VerifyEmailView = ({ logOut, resend }: Props) => {
  function onLogOutClicked() {
    logOut();
  }
  function onResendClicked() {
    resend();
  }
  return (
    <div>
      <p>
        Please verify your email address before using Training Log. Click the
        link sent to your email. (If it's not in your inbox, check spam
        folders.)
      </p>
      <Button
        variant="contained"
        onClick={onLogOutClicked}
        type="submit"
        // disabled={loading}
      >
        Log out
      </Button>
      <Button
        variant="contained"
        onClick={onResendClicked}
        type="submit"
        // disabled={loading}
      >
        Resend verification email
      </Button>
    </div>
  );
};

export default VerifyEmailView;
