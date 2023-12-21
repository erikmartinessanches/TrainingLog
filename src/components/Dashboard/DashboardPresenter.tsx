import DashboardView from "./DashboardView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  logoutNow,
  selectModelReady,
  selectUser,
} from "../../models/userSlice";
import { LoadingIconView } from "../../views/LoadingIconView";


function DashboardPresenter() {
  const modelReady = useAppSelector(selectModelReady);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logOutACB() {
    dispatch(logoutNow());
    //navigate("/");
  }

  function createNewExerciseACB() {
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
          createNewACB={createNewExerciseACB}
          user={user}
        />
      );
    }
  }
}

export default DashboardPresenter;
