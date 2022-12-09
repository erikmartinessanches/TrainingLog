/**The SecurityProvider adds my own custom functions into SecurityContext:
 * for logging in, out, signing up and seeing if we're logged in. These
 * functions will become available to all children of SecurityProvider.
 */
import { React } from "react";
import SecurityContext from "./SecurityContext";
import { useDispatch, useSelector } from "react-redux";

const SecurityProvider = (props) => {
  const dispatch = useDispatch();
  const {
    //We could use the current data in redux if we had a need for it in the view.
    data: results,
    error,
    loading,
  } = useSelector((state) => state.user || {});
  return (
    <SecurityContext.Provider
      value={{
        logIn: (email, password) => {
          dispatch({
            type: "LOGIN",
            payload: { email: email, password: password },
          });
        },
        logOut: () => {
          dispatch({ type: "LOGOUT" });
        },
        signUp: (email, password) => {
          dispatch({
            type: "SIGNUP",
            payload: { email: email, password: password },
          });
        },
        loggedIn: results,
        loading: loading,
        error: error,
      }}
    >
      {props.children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider;
