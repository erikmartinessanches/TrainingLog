/**SecureRoute gets current logged in status.
 */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectFirebaseAuthReady, selectUser } from "../models/userSlice";
import { LoadingIconView } from "../views/LoadingIcon";

const SecureRoute = ({ loggedIn = false, children }) => {
  const firebaseAuthReady = useSelector(selectFirebaseAuthReady);
  const user = useSelector(selectUser);

  // if (!firebaseAuthReady) {
  //   return <LoadingIconView />;
  // }

  if (loggedIn && user.uid !== null) {
    return <Navigate replace to="/dashboard" />;
  }

  // if (!loggedIn && user.uid === null) {
  //   return <Navigate replace to="/login" />;
  // }

  return children;
};

export default SecureRoute;
