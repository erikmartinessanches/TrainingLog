import { useAppDispatch } from '../../utils/hooks';
import { logoutNow } from '../../models/userSlice';
import VerifyEmailView from './VerifyEmailView';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../persistence/firebaseModel';

const VerifyEmailPresenter = () => {
  const dispatch = useAppDispatch();
  function logOutACB() {
    dispatch(logoutNow());
    //navigate("/");
  }

  function resend() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent.');
      })
      .catch();
  }
  return <VerifyEmailView logOut={logOutACB} resend={resend} />;
};

export default VerifyEmailPresenter;
