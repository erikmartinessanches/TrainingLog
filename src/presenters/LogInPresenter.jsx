import { React, useState } from "react";
import LogInView from "../views/LogInView";
import { useDispatch, useSelector } from "react-redux";

function LogInPresenter() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const {
    //We could use the current data in redux if we had a need for it in the view.
    data: results,
    error,
    loading,
  } = useSelector((state) => state.user || {});

  function loggedIn() {
    console.log("Here we want to log the user in.");
    //dispatch({ type: "LOGIN", payload: { email: email, password: password } });
  }

  return (
    <LogInView
      loggedIn={loggedIn}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}

export default LogInPresenter;
