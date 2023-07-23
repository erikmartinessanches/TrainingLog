import { React, useEffect } from "react";
import DashboardView from "./DashboardView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSecurity from "../../utils/useSecurity";
import {logoutNow, selectModelReady, selectUser} from "../../models/userSlice";
import { LoadingIconView } from "../../views/LoadingIcon";
//import { firebaseApi } from "../../persistence/apiSlices";
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
    
    //debugger;
   // dispatch(firebaseApi.util.invalidateTags(['Auth']));
    //dispatch(firebaseApi.util.resetApiState()); //This could possibly be called from elsewhere.
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
    navigate("/dashboard/create-record");
  }

  /**This useEffect effectively guards against going to /dashboard unless we
   * have a user set in redux. If there is not user in redux (no logged in),
   * we'll be navigated to /. But this may be fishy...
   */
  // useEffect(() => {
  //   if (!loggedIn && !error && !loading) {
  //     navigate("/");
  //   }
  //   return () => {};
  // }, [loggedIn, error, loading, navigate]);

  if (!modelReady) {
    return <LoadingIconView />;
  }
  return (
    <DashboardView
      logOut={logOutACB}
      //loading={loading}
      createNewACB={createNewACB}
      user={user}
    />
  );
}

export default DashboardPresenter;
