import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

/* Initialize Firebase. A Firebase App is a container-like object that stores 
  common configuration and shares authentication across Firebase services. After 
  you initialize a Firebase App object in your code, you can add and start using 
  Firebase services. */
//I export what I need here.
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const auth = getAuth(app);
