/**SecureRoute gets current logged in status.
 */
import { useAppSelector } from './hooks';
import { Navigate } from 'react-router-dom';
import { selectModelReady, selectLoggedOut } from '../models/userSlice';
import { LoadingIconView } from '../views/LoadingIconView';
import VerifyEmailPresenter from '../components/VerifyEmail/VerifyEmailPresenter';
import { getAuth } from 'firebase/auth';
import VerifyEmailView from '../components/VerifyEmail/VerifyEmailView';

/** 'forwardLoggedInUser' in allows us to say that for certain routes (children
 * of this component), we should navigate a logged in user to the dashboard (if
 * the uid is not null).
 */
const SecureRoute = ({ forwardLoggedInUser = false, children }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const modelReady = useAppSelector(selectModelReady);
  const loggedOut = useAppSelector(selectLoggedOut);
  // If we are about to forward logged in user from a location to dashboard, this
  // prevents temporary flash of the location and shows loading state instead!
  //debugger;

  if (forwardLoggedInUser && modelReady === false && loggedOut === false) {
    return <LoadingIconView />;
  }

  if (forwardLoggedInUser && user !== null) {
    if (!user.emailVerified) {
      return <VerifyEmailPresenter />;
    }
    return <Navigate replace to="/dashboard" />;
  }
  /**This 'protects' the child if the uid is null. For the routes (children) we
   * want to protect and not forward to a page if logged in, we simply omit
   * setting forwardLoggedInUser to true.
   */
  if (!forwardLoggedInUser && user === null) {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default SecureRoute;
