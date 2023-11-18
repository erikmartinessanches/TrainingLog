/**SecureRoute gets current logged in status.
 */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { /* selectFirebaseAuthReady, */ selectUser } from "../models/userSlice";
import { LoadingIconView } from "../views/LoadingIcon";

/** 'forwardLoggedInUser' in allows us to say that fo certain routes (children
 * of this component), we should navigate a logged-in user to the dashboard (if
 * the uid is not null).
 */
const SecureRoute = ({ forwardLoggedInUser = false, children }) => {
  //const firebaseAuthReady = useSelector(selectFirebaseAuthReady);
  const user = useSelector(selectUser);

  //if (!firebaseAuthReady) {
  return <LoadingIconView />;
  // }

  if (forwardLoggedInUser && user.uid !== null) {
    return <Navigate replace to="/dashboard" />;
  }
  /**This 'protects' the child if the uid is null. For the routes (children) we
   * want to protect and not forward to a page if logged in, we simply omit
   * setting forwardLoggedInUser to true.
   */
  if (!forwardLoggedInUser && user.uid === null) {
    //debugger;
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default SecureRoute;
