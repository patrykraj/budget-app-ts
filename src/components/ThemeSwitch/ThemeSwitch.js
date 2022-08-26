import React from "react";
import PropTypes from "prop-types";

import ThemeButton from "./ThemeSwitch.css";

export const ThemeSwitch = ({ setIsDefaultTheme, isDefaultTheme }) => {
  return (
    <ThemeButton
      className={isDefaultTheme ? "" : "active"}
      type="button"
      onClick={() => setIsDefaultTheme(!isDefaultTheme)}
    />
  );
};

export default ThemeSwitch;

ThemeSwitch.propTypes = {
  isDefaultTheme: PropTypes.bool.isRequired,
  setIsDefaultTheme: PropTypes.func.isRequired,
};
