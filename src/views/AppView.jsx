import React from "react";
import Button from "@mui/material/Button";

function AppView({ toSignUp }) {
  function onToSignUpClicked(e) {
    e.preventDefault();
    toSignUp();
    //preventDefault()?
  }

  return (
    <div className="App">
      <header className="App-header">Mini project</header>
      <h2>App view (front page)</h2>

      <Button variant="contained" onClick={onToSignUpClicked}>
        Go to sign-up form
      </Button>
    </div>
  );
}

export default AppView;
