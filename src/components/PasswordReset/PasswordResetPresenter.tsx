import React, { useState} from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import PasswordResetView from "./PasswordResetView";

// https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
function PasswordResetPresenter() {
  const [email, setEmail] = useState("");

  async function onSubmitACB() {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email).then(()=> {
      console.log("Password reset email sent!");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    })
  }

  return <PasswordResetView onSubmitACB={onSubmitACB} setEmail={setEmail} />;
}

export default PasswordResetPresenter;
