import React, { useState, useEffect } from "react";
import AuthView from "./AuthView";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//} from "firebase/auth";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../models/userSlice";
import { useSignUpWithFirebaseMutation } from "../../persistence/apiSlices";

function successACB() {
  console.log("Signed in.");
}
function failureACB(e) {
  console.log(e.customData.message);
}
export default function AuthPresenter(props) {
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  //const auth = getAuth(firebaseApp);
  const [signUpNow] = useSignUpWithFirebaseMutation();

  useEffect(() => {
    location.pathname === "/login" ? setSignup(false) : setSignup(true);
  }, [location]);

  function onSubmitACB() {
    //debugger;
    signUpNow({ email, password });
    // dispatch(
    //   authenticate({
    //     usingAsSignUp: signup,
    //     email,
    //     password,
    //   })
    // );
    // createUserWithEmailAndPassword(props.auth, email, password)
    //   .then(successACB)
    //   .then(failureACB);
  }

  /*   function signInACB() {
    signInWithEmailAndPassword(props.auth, email, password)
      .then(successACB)
      .catch(failureACB);
  } */

  return (
    <AuthView
      isSignup={signup}
      onSubmitACB={onSubmitACB}
      //signIn={signInACB}
      setEmail={setEmail}
      setPassword={setPassword}
      toggleType={setSignup}
      //  email={email}
      //   password={password}
    />
  );
}
