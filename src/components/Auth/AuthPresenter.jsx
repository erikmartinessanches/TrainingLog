import React, { useState, useEffect } from "react";
import AuthView from "./AuthView";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerOrLogIn } from "../../models/userSlice";

export default function AuthPresenter(props) {
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    location.pathname === "/login" ? setSignup(false) : setSignup(true);
  }, [location.pathname]);

  async function onSubmitACB() {
    dispatch(
      registerOrLogIn({
        email,
        password,
        signUpOption: signup,
        firstName,
        lastName,
      })
    );
  }

  return (
    <AuthView
      isSignup={signup}
      onSubmitACB={onSubmitACB}
      //signIn={signInACB}
      setEmail={setEmail}
      setPassword={setPassword}
      toggleType={setSignup}
      setFirstName={setFirstName}
      setLastName={setLastName}
      //  email={email}
      //   password={password}
    />
  );
}
