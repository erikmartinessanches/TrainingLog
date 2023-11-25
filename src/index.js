import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LandingPagePresenter from "./components/LandingPage/LandingPagePresenter";
import {
  createBrowserRouter,
  RouterProvider /*, Route*/,
} from "react-router-dom";
import ErrorView from "./views/ErrorView";
import DashboardPresenter from "./components/Dashboard/DashboardPresenter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
//import reportWebVitals from './reportWebVitals';
import SecureRoute from "./utils/SecureRoute";
import CreateRecordPresenter from "./components/CreateExercise/CreateExercisePresenter";
import AuthPresenter from "./components/Auth/AuthPresenter";
import PasswordResetPresenter from "./components/PasswordReset/PasswordResetPresenter";
import store from "./models/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SecureRoute forwardLoggedInUser>
        <LandingPagePresenter />
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/signup",
    element: (
      <SecureRoute forwardLoggedInUser>
        <AuthPresenter />
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/login",
    element: (
      <SecureRoute forwardLoggedInUser>
        <AuthPresenter />
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/dashboard",
    element: (
      <SecureRoute>
        <DashboardPresenter />
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/dashboard/create-exercise",
    element: (
      <SecureRoute>
        <CreateRecordPresenter />
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetPresenter />,
    errorElement: <ErrorView />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
