import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AppView({ toSignUp }) {
  return (
    <div className="App">
      <header className="App-header">Mini project</header>
      <h2>App view (front page)</h2>
      <Button variant="contained" onClick={toSignUp}>
        Go to sign-up form
      </Button>
    </div>
  );
}

export default AppView;
