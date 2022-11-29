import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorView() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        Sorry, an unexpected error has occurred, probably with the routing...
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
