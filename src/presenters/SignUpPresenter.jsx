import { React, useState } from "react";
import SignUpView from "../views/SignUpView";

function SignUpPresenter() {
  const [status, setStatus] = useState("empty");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); //The last error

  function onSignUp(e) {
    console.log("Here we want to sign the user up.");
    setStatus("submitting");

    // Here we want to try/catch submitting the form and set status and error accordingly,
    // see https://beta.reactjs.org/learn/reacting-to-input-with-state#step-5-connect-the-event-handlers-to-set-state
  }

  return (
    <SignUpView onSignUp status error setEmail setPassword email password />
  );
}

export default SignUpPresenter;
