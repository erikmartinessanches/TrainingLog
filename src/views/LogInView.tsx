import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LogInView({ loggedIn, loading, setEmail, setPassword }) {
  function onLogInClicked(e) {
    e.preventDefault();
    loggedIn();
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={onLogInClicked}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          //value={email}
          disabled={loading}
          onChange={handleEmailChange}
          //autoComplete="current-email"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          //value={password}
          type="password"
          autoComplete="current-password"
          disabled={loading}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          //onClick={onSignUpClicked}
          type="submit"
          disabled={loading}
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogInView;
