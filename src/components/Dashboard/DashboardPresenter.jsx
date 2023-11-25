import { React, useEffect } from "react";
import DashboardView from "./DashboardView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  logoutNow,
  selectModelReady,
  selectUser,
} from "../../models/userSlice";
import { LoadingIconView } from "../../views/LoadingIcon";
import AuthPresenter from "../Auth/AuthPresenter";

function DashboardPresenter() {
  const modelReady = useSelector(selectModelReady);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function logOutACB() {
    dispatch(logoutNow());
    //navigate("/");
  }

  function createNewACB() {
    navigate("/dashboard/create-exercise");
  }

  //Placing it here for simplicity, consider using the "secure routes" in parent instead.
  // if (user.uid === undefined) {
  //   return <LoadingIconView />;
  // }
  // if (user.uid === null) {
  //   return <AuthPresenter />;
  // }
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
