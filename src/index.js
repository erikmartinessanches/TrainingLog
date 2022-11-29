import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./presenters/App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorView from "./views/ErrorView";
import SignUpPresenter from "./presenters/SignUpPresenter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
  },
  {
    path: "/signup",
    element: <SignUpPresenter />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
