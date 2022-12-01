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

  useEffect(() => {
    if (!results && !error && !loading) {
      navigate("/");
    }
    return () => {};
  }, [results, error, loading, navigate]);

  return <DashboardView logOut={logOut} loading={loading} />;
}

export default DashboardPresenter;
