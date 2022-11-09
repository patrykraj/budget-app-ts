import React from "react";

import ErrorHandlerTypes from "./ErrorHandlerTypes";

const ErrorHandler: React.FC<ErrorHandlerTypes> = ({ children }) => {
  return (
    <div>
      <h1>Following error occured:</h1>
      <h2>{children}</h2>
      <h3>Please refresh</h3>
    </div>
  );
};

export default React.memo(ErrorHandler);
