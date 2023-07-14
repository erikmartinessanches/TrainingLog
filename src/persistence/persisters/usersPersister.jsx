import { get, onValue, ref } from "firebase/database";
//import { setRecordIds, setUserId } from "../../models/userSlice";

function usersPersister() {
  const getRefs = (firebaseDb, state) => {
    const userRef = ref(firebaseDb, `users/${state.auth.user.uid}/`);
    return { userRef };
  };

  const toFirebase = (firebaseDb, state, previousState) => {
    const { userRef } = getRefs(firebaseDb, state);
    // const user = state.auth.user;
    // const previousUser = previousState.auth.user;
    // const userId = user.uid;

    //if (userId !== previousUser.uid) {
    //}
    //TODO Write userId at userRef in firebase.
  };
}

export default usersPersister;
