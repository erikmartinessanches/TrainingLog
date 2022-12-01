import React from "react";
import Button from "@mui/material/Button";

function AppView({ toSignUp, toLogIn }) {
  return (
    <div className="App">
      <header className="App-header">Mini project</header>
      <h2>App view (front page)</h2>
      <Button variant="contained" onClick={toSignUp}>
        Sign-up
      </Button>
      <Button variant="contained" onClick={toLogIn}>
        Log in
      </Button>
    </div>
  );
}

export default AppView;
