import React from "react";
import PropTypes from "prop-types";

import InputErrorSpan from "./InputErrorHandler.css";

const InputErrorHandler = ({ inputValues }) => {
  if (!inputValues.touched || (inputValues.touched && inputValues.valid))
    return null;
  if (inputValues.touched && inputValues.value && !inputValues.valid)
    return <InputErrorSpan>Wprowadz wlasciwa wartosc</InputErrorSpan>;

  return <InputErrorSpan>Pole wymagane</InputErrorSpan>;
};

export default InputErrorHandler;

InputErrorHandler.propTypes = {
  inputValues: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
