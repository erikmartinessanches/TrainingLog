import React, { useState } from 'react'
import AuthView from './AuthView'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

function successACB() {
  console.log("Signed in.")
}
function failureACB(e) {
  console.log(e.customData.message)
}
export default function AuthPresenter(props) {
  const [signup, setSignup] = useState(true)
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("")

  function signUpACB() {
    createUserWithEmailAndPassword(props.auth, email, password).then(successACB).then(failureACB)
  }

  function signInACB() {
    signInWithEmailAndPassword(props.auth, email, password).then(successACB).catch(failureACB) 
  }

  return (
    <AuthView isSignup={signup} signUp={signUpACB} signIn={signInACB} setEmail={setEmail} setPassword={setPassword} toggleType={setSignup}/>
  )
}
