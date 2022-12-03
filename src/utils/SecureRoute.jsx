/**SecureRoute gets current logged in status from SecurityCOntext using useSecurity
 * custom hook.
 */
import React from "react";
import LogInPresenter from "../presenters/LogInPresenter";
import { Navigate, Outlet } from "react-router-dom";
import useSecurity from "./useSecurity";

const SecureRoute = (props) => {
  const { loggedIn } = useSecurity(); //the real deal
  //const loggedIn = true; //Temp during dev.
  /**If we're logged in, return an Outlet that will render the children. */
  return loggedIn ? props.children : <Navigate to="/" />;
};

export default SecureRoute;
