import React from "react";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";


//Navigating is ok from the View. 
function LandingPageView() {
  const navigate = useNavigate();

  function toSignUpACB() {
    navigate("/signup");
  }

  console.log(`Hello from ${import.meta.env.REACT_APP_HELLO} environment!`)

  function toLogInACB() {
    navigate("/login");
  }
  return (
    <div className="App">
      <header className="App-header">Mini project</header>
      <h2>App view (front page)</h2>
      <Button variant="contained" onClick={toSignUpACB}>
        Sign-up
      </Button>
      <Button variant="contained" onClick={toLogInACB}>
        Log in
      </Button>
    </div>
  );
}

export default LandingPageView;
