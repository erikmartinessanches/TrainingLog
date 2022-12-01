import { React, useEffect } from "react";
import DashboardView from "../views/DashboardView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashboardPresenter() {
  const {
    //We could use the current data in redux if we had a need for it in the view.
    data: results,
    error,
    loading,
  } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    console.log("Log the user out.");
    dispatch({ type: "LOGOUT" });
  }

  /**This useEffect effectively guards against going to /dashboard unless we
   * have a user set in redux. If there is not user in redux (no logged in),
   * we'll be navigated to /. But this may be fishy...
   */
  useEffect(() => {
    if (!results && !error && !loading) {
      navigate("/");
    }
    return () => {};
  }, [results, error, loading, navigate]);

  return <DashboardView logOut={logOut} loading={loading} />;
}

export default DashboardPresenter;
