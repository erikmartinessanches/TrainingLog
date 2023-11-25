import {
  auth,
  updateFirebaseFromModel,
  updateModelFromFirebase,
} from "../../persistence/firebaseModel";
import { useState, useEffect } from "react";
import AuthPresenter from "../Auth/AuthPresenter";
import {
  createHashRouter,
  RouterProvider,
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

function ReactRoot() {
  return <div>ReactRoot</div>;
}

export default ReactRoot;
