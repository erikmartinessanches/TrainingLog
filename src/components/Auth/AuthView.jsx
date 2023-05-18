import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function AuthView(props) {
  function setEmailACB(event) {
    props.setEmail(event.target.value);
  }

  function setPasswordACB(event) {
    props.setPassword(event.target.value);
  }

  function handleSubmitACB(event) {
    event.preventDefault();
    if (props.isSignup) {
      props.signUp();
    } else {
      props.signIn();
    }
  }

  return (
    <React.Fragment>
      <h2>{props.isSignup ? "Sign-up" : "Log in"}</h2>
      <form onSubmit={handleSubmitACB}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          //value={email}
          //disabled={loading}
          onChange={setEmailACB}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          // value={password}
          type="password"
          autoComplete="current-password"
          //  disabled={loading}
          onChange={setPasswordACB}
        />
        <Button
          variant="contained"
          type="submit"
          //value={props.isSignup ? "Register" : "Sign in"}
          //onClick={onSignUpClicked}
          //disabled={loading || status === "empty"}
        >
          {props.isSignup ? "Sign-up" : "Log in"}
        </Button>
        {" or "}
        <Link to={props.isSignup ? "/login" : "/signup"}>
          {!props.isSignup ? "Sign-up" : "Log in"}
        </Link>
      </form>
    </React.Fragment>
  );
}
