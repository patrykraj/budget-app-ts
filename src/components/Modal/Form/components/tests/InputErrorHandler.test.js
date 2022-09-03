import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import InputErrorHandler from "../InputErrorHandler";
import renderWithProviders from "../../../../../utils/testUtils/testUtils";
import {
  inputErrorHandlerStrings,
  formStrings,
  validationTypes,
} from "../../../../../static/constants";
import formValidator from "../formValidators";

describe("InputErrorHandler", () => {
  const { incorrectValue, requiredField } = inputErrorHandlerStrings;
  const { defaultCategoryId } = formStrings;
  const { description, amount, select, isFormValid } = validationTypes;

  const props = {
    description: {
      value: "",
      touched: true,
      valid: formValidator({
        type: description,
        val: "",
      }),
    },
    amount: {
      value: "value",
      touched: true,
      valid: formValidator({
        type: amount,
        val: "value",
      }),
    },
    selectValue: {
      value: defaultCategoryId,
      valid: formValidator({
        type: select,
        val: defaultCategoryId,
      }),
    },
  };

  test("InputErrorHandler should render required field error", () => {
    renderWithProviders(<InputErrorHandler inputValues={props.description} />);
    expect(screen.getByText(requiredField)).toBeDefined();
  });

  test("InputErrorHandler should render incorrect value error", () => {
    renderWithProviders(<InputErrorHandler inputValues={props.amount} />);
    expect(screen.getByText(incorrectValue)).toBeDefined();
  });

  test("InputErrorHandler should not render if form correctly validated", () => {
    const container = renderWithProviders(
      <InputErrorHandler inputValues={props.selectValue} />
    );
    expect(container.queryByText(incorrectValue)).toBe(null);
  });

  test("InputErrorHandler should return error for invalid cases", () => {
    const correctProps = {
      description: {
        value: "value",
        touched: true,
        valid: formValidator({
          type: description,
          val: "value",
        }),
      },
      amount: {
        value: "value",
        touched: true,
        valid: formValidator({
          type: amount,
          val: 1,
        }),
      },
      selectValue: {
        value: defaultCategoryId,
        valid: formValidator({
          type: select,
          val: defaultCategoryId,
        }),
      },
    };

    const formValid = formValidator({
      type: isFormValid,
      val: correctProps,
    });
    expect(formValid).toBe(true);

    const container = renderWithProviders(
      <InputErrorHandler
        inputValues={{
          value: 1,
          touched: true,
          valid: formValidator({ type: incorrectValue, val: 1 }),
        }}
      />
    );
    expect(container.getByText(incorrectValue)).toBeDefined();
  });
});
