import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../persistence/firebaseModel';

import PasswordResetView from './PasswordResetView';

// https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
function PasswordResetPresenter() {
  const [email, setEmail] = useState<string>('');

  async function onSubmitACB() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return <PasswordResetView onSubmitACB={onSubmitACB} setEmail={setEmail} />;
}

export default PasswordResetPresenter;
