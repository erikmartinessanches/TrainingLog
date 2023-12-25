import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Props {
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setPassword: (password: string) => void;
  onSubmitACB: () => void;
  isSignup: boolean;
}
export default function AuthView(props: Props) {
  function setEmailACB(event: React.ChangeEvent<HTMLInputElement>) {
    props.setEmail(event.target.value);
  }
  function setFirstNameACB(event: React.ChangeEvent<HTMLInputElement>) {
    props.setFirstName(event.target.value);
  }
  function setLastNameACB(event: React.ChangeEvent<HTMLInputElement>) {
    props.setLastName(event.target.value);
  }

  function setPasswordACB(event: React.ChangeEvent<HTMLInputElement>) {
    props.setPassword(event.target.value);
  }

  function handleSubmitACB(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onSubmitACB();
  }

  return (
    <React.Fragment>
      <h2>{props.isSignup ? 'Sign-up' : 'Log in'}</h2>
      <form onSubmit={handleSubmitACB}>
        <TextField
          required
          //id="outlined-required"
          label="Email"
          //value={props.email}
          //{...(props.isSignup ? { value: "" } : {})}
          //value={props.isSignup ? "" : null}
          //disabled={loading}
          onChange={setEmailACB}
        />
        {props.isSignup && (
          <TextField
            //id="outlined"
            label="First name"
            //value={props.email}
            //{...(props.isSignup ? { value: "" } : {})}
            //value={props.isSignup ? "" : null}
            //disabled={loading}
            onChange={setFirstNameACB}
          />
        )}
        {props.isSignup && (
          <TextField
            //id="outlined"
            label="Last name"
            //value={props.email}
            //{...(props.isSignup ? { value: "" } : {})}
            //value={props.isSignup ? "" : null}
            //disabled={loading}
            onChange={setLastNameACB}
          />
        )}
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          //value={props.isSignup ? "" : undefined}
          //value={props.password}
          type="password"
          // {...(!props.isSignup ? { autoComplete: "current-password" } : {})}
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
          {props.isSignup ? 'Sign-up' : 'Log in'}
        </Button>
        {' or '}
        <Link to={props.isSignup ? '/login' : '/signup'}>
          {!props.isSignup ? 'Sign-up' : 'Log in'}
        </Link>
        {!props.isSignup && <Link to="/password-reset">Forgot password?</Link>}
      </form>
    </React.Fragment>
  );
}
