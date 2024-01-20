import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HeaderPresenter from './components/Header/HeaderPresenter';
import LandingPagePresenter from './components/LandingPage/LandingPagePresenter';
import {
  createBrowserRouter,
  RouterProvider /*, Route*/,
} from 'react-router-dom';
import ErrorView from './views/ErrorView';
import DashboardPresenter from './components/Dashboard/DashboardPresenter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
//import reportWebVitals from './reportWebVitals';
import SecureRoute from './utils/SecureRoute';
import CreateRecordPresenter from './components/CreateExercise/CreateExercisePresenter';
import AuthPresenter from './components/Auth/AuthPresenter';
import PasswordResetPresenter from './components/PasswordReset/PasswordResetPresenter';
import store from './models/store';
import PrivacyView from './components/Privacy/PrivacyView';
import TosView from './components/TOS/TosView';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Fragment>
        <HeaderPresenter />
        <LandingPagePresenter />
      </React.Fragment>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/signup',
    element: (
      <SecureRoute forwardLoggedInUser>
        <React.Fragment>
          <HeaderPresenter />
          <AuthPresenter />
        </React.Fragment>
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/login',
    element: (
      <SecureRoute forwardLoggedInUser>
        <React.Fragment>
          <HeaderPresenter />
          <AuthPresenter />
        </React.Fragment>
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/dashboard',
    element: (
      <SecureRoute>
        <React.Fragment>
          <HeaderPresenter />
          <DashboardPresenter />
        </React.Fragment>
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/dashboard/create-exercise',
    element: (
      <SecureRoute>
        <React.Fragment>
          <HeaderPresenter />
          <CreateRecordPresenter />
        </React.Fragment>
      </SecureRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/password-reset',
    element: (
      <React.Fragment>
        <HeaderPresenter />
        <PasswordResetPresenter />
      </React.Fragment>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/privacy',
    element: (
      <React.Fragment>
        <HeaderPresenter />
        <PrivacyView />
      </React.Fragment>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: '/terms',
    element: (
      <React.Fragment>
        <HeaderPresenter />
        <TosView />
      </React.Fragment>
    ),
    errorElement: <ErrorView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
