import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function PasswordResetView(props) {
  function setEmailACB(event) {
    props.setEmail(event.target.value);
  }


  function handleSubmitACB(event) {
    event.preventDefault();
    props.onSubmitACB();
  }

  return (
    <React.Fragment>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmitACB}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          //value={props.email}
          //{...(props.isSignup ? { value: "" } : {})}
          //value={props.isSignup ? "" : null}
          //disabled={loading}
          onChange={setEmailACB}
        />
        <Button
          variant="contained"
          type="submit"
          //value={props.isSignup ? "Register" : "Sign in"}
          //onClick={onSignUpClicked}
          //disabled={loading || status === "empty"}
        >
          Send password reset email
        </Button>
        {" or "}
        <Link to={"/login"}>
          {"Back to login"}
        </Link>
        
      </form>
    </React.Fragment>
  );
}

export default PasswordResetView;
