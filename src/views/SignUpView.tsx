import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function SignUpView({
  loading,
  onSignUp,
  status,
  error,
  setEmail,
  setPassword,
  email,
  password,
  results,
}) {
  function onSignUpClicked(e) {
    e.preventDefault();
    onSignUp();
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (results) {
    return <h1>You signed up!</h1>;
  }

  if (error) {
    return (
      <React.Fragment>
        <h1>There was an error, how unfortunate.</h1>
        {error !== null && <p>{error?.message}</p>}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h2>Sign Up!</h2>
      <form onSubmit={onSignUpClicked}>
        <Stack spacing={2} direction="row">
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={email}
            disabled={loading}
            onChange={handleEmailChange}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            value={password}
            type="password"
            autoComplete="current-password"
            disabled={loading}
            onChange={handlePasswordChange}
          />
          <Button
            variant="text"
            onClick={onSignUpClicked}
            //disabled={loading || status === "empty"}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
}

export default SignUpView;
