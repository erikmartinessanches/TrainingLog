import React from "react";
import { useDispatch } from "react-redux";
import { logoutNow } from "../../models/userSlice";
import VerifyEmailView from "./VerifyEmailView";

const VerifyEmailPresenter = () => {
  const dispatch = useDispatch();
  function logOutACB() {
    dispatch(logoutNow());
    //navigate("/");
  }
  return <VerifyEmailView logOut={logOutACB} />;
};

export default VerifyEmailPresenter;
