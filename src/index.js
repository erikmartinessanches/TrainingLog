import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./models/store";
import LandingPagePresenter from "./components/LandingPage/LandingPagePresenter";
import {
  createBrowserRouter,
  RouterProvider /*, Route*/,
} from "react-router-dom";
import ErrorView from "./views/ErrorView";
//import SignUpPresenter from "./presenters/SignUpPresenter";
//import LogInPresenter from "./presenters/LogInPresenter";
import DashboardPresenter from "./components/Dashboard/DashboardPresenter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//import { fbMiddleware } from "./redux/middleware";
//import { reducer } from "./redux/reducers";
import { Provider } from "react-redux";

//import reportWebVitals from './reportWebVitals';
import SecureRoute from "./utils/SecureRoute";
import SecurityProvider from "./utils/SecurityProvider";
import CreateRecordPresenter from "./components/CreateRecord/CreateRecordPresenter";
import ReactRoot from "./presenters/ReactRoot";
import AuthPresenter from "./components/Auth/AuthPresenter";
import PasswordResetPresenter from "./components/PasswordReset/PasswordResetPresenter";

//const store = configureStore({ reducer: reducer, middleware: fbMiddleware });

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
    path: "/dashboard/create-record",
    element: (
      <SecureRoute>
        <CreateRecordPresenter />
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/password-reset",
    element: (

        <PasswordResetPresenter />

    ),
    errorElement: <ErrorView />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SecurityProvider> */}
      <RouterProvider router={router} />
      {/* </SecurityProvider> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
