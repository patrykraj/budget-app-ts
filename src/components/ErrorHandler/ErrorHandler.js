import React from "react";
import PropTypes from "prop-types";

const ErrorHandler = ({ children }) => {
  return (
    <div>
      <h1>Following error occured:</h1>
      <h2>{children}</h2>
      <h3>Please refresh</h3>
    </div>
  );
};

export default React.memo(ErrorHandler);

ErrorHandler.propTypes = {
  children: PropTypes.string.isRequired,
};
