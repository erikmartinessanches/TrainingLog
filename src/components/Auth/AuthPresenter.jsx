import React, { useState, useEffect } from "react";
import AuthView from "./AuthView";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
    location.pathname === "/login" ? setSignup(false) : setSignup(true);
  }, [location]);

  function signUpACB() {
    createUserWithEmailAndPassword(props.auth, email, password)
      .then(successACB)
      .then(failureACB);
  }

  function signInACB() {
    signInWithEmailAndPassword(props.auth, email, password)
      .then(successACB)
      .catch(failureACB);
  }

  return (
    <AuthView
      isSignup={signup}
      signUp={signUpACB}
      signIn={signInACB}
      setEmail={setEmail}
      setPassword={setPassword}
      toggleType={setSignup}
    />
  );
}
