import React from "react";
import PropTypes from "prop-types";

import InputErrorSpan from "./InputErrorHandler.css";
import { inputErrorHandlerStrings } from "../../../../static/constants";

const InputErrorHandler = ({ inputValues }) => {
  const { incorrectValue, requiredField } = inputErrorHandlerStrings;
  if (!inputValues.touched || (inputValues.touched && inputValues.valid))
    return null;
  if (inputValues.touched && inputValues.value && !inputValues.valid)
    return <InputErrorSpan>{incorrectValue}</InputErrorSpan>;

  return <InputErrorSpan>{requiredField}</InputErrorSpan>;
};

export default InputErrorHandler;

InputErrorHandler.propTypes = {
  inputValues: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
