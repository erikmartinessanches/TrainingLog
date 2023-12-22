import { useAppDispatch } from "../../utils/hooks";
import { logoutNow } from "../../models/userSlice";
import VerifyEmailView from "./VerifyEmailView";
import { getAuth, sendEmailVerification } from "firebase/auth";

const VerifyEmailPresenter = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  function logOutACB() {
    dispatch(logoutNow());
    //navigate("/");
  }

  function resend() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email verification sent.");
      })
      .catch();
  }
  return <VerifyEmailView logOut={logOutACB} resend={resend} />;
};

export default VerifyEmailPresenter;
