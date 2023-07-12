import React, { useState, useEffect } from "react";
import AuthView from "./AuthView";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//} from "firebase/auth";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setAuthFulfilled } from "../../models/userSlice";
//import { useAuthenticateWithFirebaseMutation } from "../../persistence/apiSlices";

function successACB() {
  console.log("Signed in.");
}
function failureACB(e) {
  console.log(e.customData.message);
}
export default function AuthPresenter(props) {
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  //const auth = getAuth(firebaseApp);
  //const [authenticateNow, mutationResult] = useAuthenticateWithFirebaseMutation({fixedCacheKey: "logindata"});

/*   useEffect(() => {
    location.pathname === "/login" ? setSignup(false) : setSignup(true);
  }, [] ); */
  useEffect(() => {
    location.pathname === "/login" ? setSignup(false) : setSignup(true);
  }, [location.pathname] );

  async function onSubmitACB() {
    //debugger;
    //const yo = await authenticateNow({ email, password, usingAsSignUp: signup });
    //const you = services;
    //debugger;
     dispatch(
       authenticate({
         usingAsSignUp: signup,
         email,
         password,
       })
     );
    // createUserWithEmailAndPassword(props.auth, email, password)
    //   .then(successACB)
    //   .then(failureACB);
  }

  /*   function signInACB() {
    signInWithEmailAndPassword(props.auth, email, password)
      .then(successACB)
      .catch(failureACB);
  } */
 //debugger
  // useEffect(() => mutationResult.requestId && console.log(mutationResult.data,"OUTSIDE CALLBACK ( isLoading and other data working ):",JSON.parse(JSON.stringify(mutationResult)))
  // ,[mutationResult])

  /**In this presenter I experiment with RTK Query for authenticating. RTK Query
   * provides convenient hooks. I use useEffects below to set redux state. If I
   * had done this with thunks, I would only dispatch the thunk once and it would
   * eventually call the appropriate reducers in extra reducers in the state slice.
  */
  // useEffect(() => {
  //   if (mutationResult.isSuccess &&  mutationResult.status==="fulfilled"){
  //     console.log(mutationResult);
  //     dispatch(setAuthFulfilled(mutationResult.data));
  //   }
  // }
  // ,[dispatch, mutationResult])
  //TODO: rejected and loading states. 

  return (
    <AuthView
      isSignup={signup}
      onSubmitACB={onSubmitACB}
      //signIn={signInACB}
      setEmail={setEmail}
      setPassword={setPassword}
      toggleType={setSignup}
      //  email={email}
      //   password={password}
    />
  );
}
