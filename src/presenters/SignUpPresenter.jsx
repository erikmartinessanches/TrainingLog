import { React, useState, useEffect } from "react";
import SignUpView from "../views/SignUpView";
import { useDispatch, useSelector } from "react-redux";

function SignUpPresenter() {
  const [status, setStatus] = useState("empty");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState(null); //The last error

  const {
    //We could use the current data in redux if we had a need for it in the view.
    data: results,
    error,
    loading,
  } = useSelector((state) => state.signUpResults || {});

  const dispatch = useDispatch();

  /** useEffect here depends on the state and sets the status only when email
   * or password has changed and they are not empty strings!
   */
  useEffect(() => {
    if (email !== "" && password !== "") {
      setStatus("typing");
    } else {
      setStatus("empty");
    }
    return () => {};
  }, [email, password]);

  function onSignUp(e) {
    console.log("Here we want to sign the user up.");
    setStatus("submitting");
    dispatch({ type: "SIGNUP", payload: { email: email, password: password } });

    // Here we want to try/catch submitting the form and set status and error accordingly,
    // see https://beta.reactjs.org/learn/reacting-to-input-with-state#step-5-connect-the-event-handlers-to-set-state
  }

  return (
    <SignUpView
      loading={loading}
      onSignUp={onSignUp}
      status={status}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}
      results={results}
    />
  );
}

export default SignUpPresenter;
