import React from "react";
import { firebaseConfig } from "../../config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
//Import firebase
function Persistence() {
  /* Initialize Firebase. A Firebase App is a container-like object that stores 
  common configuration and shares authentication across Firebase services. After 
  you initialize a Firebase App object in your code, you can add and start using 
  Firebase services. */
  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);

  //return <div>Persistence</div>;
}

export default Persistence;
