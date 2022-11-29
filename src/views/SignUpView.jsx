import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignUpView({
  onSignUp,
  status,
  error,
  setEmail,
  setPassword,
  email,
  password,
}) {
  function onSignUpClicked(e) {
    e.preventDefault();
    onSignUp();
    //preventDefault()?
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (status === "success") {
    return <h1>You signed up!</h1>;
  }

  if (status === "error") {
    return (
      <React.Fragment>
        <h1>There was an error, how unfortunate.</h1>
        {error !== null && <p>{error.message}</p>}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h2>Sign Up</h2>
      <form onSubmit={onSignUpClicked}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          disabled={status === "submitting"}
          onChange={handleEmailChange}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          value={password}
          type="password"
          autoComplete="current-password"
          disabled={status === "submitting"}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          onClick={onSignUpClicked}
          disabled={status === "submitting" || status === "empty"}
        >
          Sign Up
        </Button>
      </form>
    </React.Fragment>
  );
}

export default SignUpView;
