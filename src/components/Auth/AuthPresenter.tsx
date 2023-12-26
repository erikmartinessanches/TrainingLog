import { useState, useEffect } from 'react';
import AuthView from './AuthView';
import { useLocation } from 'react-router-dom';
import { registerOrLogIn, authWithProvider } from '../../models/userSlice';
import { useAppDispatch } from '../../utils/hooks';

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
    dispatch(authWithProvider({ provider: 'google' }));
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
