import { useState, useEffect } from 'react';
import AuthView from './AuthView';
import { useLocation } from 'react-router-dom';
import { registerOrLogIn, authWithProvider } from '../../models/userSlice';
import { useAppDispatch } from '../../utils/hooks';
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../../persistence/firebaseModel';

export default function AuthPresenter() {
  const [signup, setSignup] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    location.pathname === '/login' ? setSignup(false) : setSignup(true);
  }, [location.pathname]);

  async function onSubmitACB() {
    dispatch(
      registerOrLogIn({
        email,
        password,
        signUpOption: signup,
        firstName,
        lastName,
      }),
    );
  }

  async function signUpWithGoogle() {
    const provider = new GoogleAuthProvider();

    //It appears this is enough to properly sign in.
    await signInWithRedirect(auth, provider); //Page reloads just after the next call,
    //below.
    //getResults(auth); //Gets results manually, but may not be necessary.
    /*.then(() => {
      getRedirectResult(auth)
        .then((result) => {
          const user = result.user;
          console.log('user: ' + user);
          debugger;
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    });*/
  }

  return (
    <AuthView
      isSignup={signup}
      onSubmitACB={onSubmitACB}
      //signIn={signInACB}
      setEmail={setEmail}
      setPassword={setPassword}
      //toggleType={setSignup}
      setFirstName={setFirstName}
      setLastName={setLastName}
      //  email={email}
      //   password={password}
      signUpWithGoogle={signUpWithGoogle}
    />
  );
}
