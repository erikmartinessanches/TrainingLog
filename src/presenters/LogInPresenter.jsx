import { React, useState, useEffect } from "react";
import LogInView from "../views/LogInView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogInPresenter() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    //We could use the current data in redux if we had a need for it in the view.
    data: results,
    error,
    loading,
  } = useSelector((state) => state.user || {});

  function loggedIn() {
    console.log(`Log the user in with ${email} and ${password}.`);
    dispatch({ type: "LOGIN", payload: { email: email, password: password } });
  }

  useEffect(() => {
    if (results && !error && !loading) {
      navigate("/dashboard");
    }
    return () => {};
  }, [results, error, loading, navigate]);

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
