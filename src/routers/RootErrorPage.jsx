import { useRouteError } from "react-router-dom";
import React from "react";

const RootErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="root-error-page">
      <p>
        <i>
          {error?.statusText ||
            error?.message ||
            "Something went wrong. Please try again later."}
        </i>
      </p>
    </div>
  );
};

export default RootErrorPage;
