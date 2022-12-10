import { React, useState, useEffect } from "react";
import LogInView from "../views/LogInView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSecurity from "../utils/useSecurity";
import { updateModelFromFirebase } from "../persistence/firebaseModel";

function LogInPresenter() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const {
  //   //We could use the current data in redux if we had a need for it in the view.
  //   data: results,
  //   error,
  //   loading,
  // } = useSelector((state) => state.user || {});

  const { logIn, loggedIn, loading, error } = useSecurity();

  function loggedInACB() {
    console.log(`Log the user in with ${email} and ${password}.`);
    //dispatch({ type: "LOGIN", payload: { email: email, password: password } });
    logIn(email, password);
    //FirebaseModel();
  }

  useEffect(() => {
    if (loggedIn && !error && !loading) {
      //console.log(loggedIn);
      updateModelFromFirebase(dispatch, loggedIn.uid);
      //FirebaseModel();
      navigate("/dashboard");
    }
    return () => {};
  }, [loggedIn, error, loading, navigate]);

  return (
    <LogInView
      loggedIn={loggedInACB}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}

export default LogInPresenter;
