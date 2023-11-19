import { React, useEffect } from "react";
import DashboardView from "./DashboardView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSecurity from "../../utils/useSecurity";
import {
  logoutNow,
  selectModelReady,
  selectUser,
} from "../../models/userSlice";
import { LoadingIconView } from "../../views/LoadingIcon";
import AuthPresenter from "../Auth/AuthPresenter";
//import { updateModelFromFirebase } from "../persistence/firebaseModel";

function DashboardPresenter() {
  // const {
  //   //We could use the current data in redux if we had a need for it in the view.
  //   data: results,
  //   error,
  //   loading,
  // } = useSelector((state) => state.user || {});
  const modelReady = useSelector(selectModelReady);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { logOut, loggedIn, loading, error } = useSecurity();
  //const [shouldLogout, setShouldLogout] = useState(false);

  // useEffect(() => {
  //   if(shouldLogout)  {
  //     navigate("/");
  //     //dispatch(logoutNow());
  //   }
  // }, [shouldLogout])

  function logOutACB() {
    //  console.log("Log the user out.");
    //setShouldLogout(true);
    dispatch(logoutNow());
    //navigate("/");

    //  logOut();
  }

  // useEffect(() => {
  //   updateModelFromFirebase();
  //   //rerender?
  // }, []);

  function createNewACB() {
    navigate("/dashboard/create-exercise");
  }

  

  //Placing it here for simplicity, consider using the "secure routes" in parent instead.
  if (user.uid === undefined) {
    return <LoadingIconView />;
  }
  if (user.uid === null) {
    return <AuthPresenter />;
  }
  if (user.uid) {
    if (!modelReady) {
      return <LoadingIconView />;
    } else {
      return (
        <DashboardView
          logOut={logOutACB}
          //loading={loading}
          createNewACB={createNewACB}
          user={user}
        />
      );
    }
  }
}

export default DashboardPresenter;
