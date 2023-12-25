import { useAppDispatch } from '../../utils/hooks';
import { logoutNow } from '../../models/userSlice';
import VerifyEmailView from './VerifyEmailView';
import {
  //getAuth,
  sendEmailVerification,
  connectAuthEmulator,
} from 'firebase/auth';
import { auth } from '../../persistence/firebaseModel';

const VerifyEmailPresenter = () => {
  // const auth = getAuth();
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    console.log('hi');
  }
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
