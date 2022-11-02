import { validationTypes } from "../../../../static/constants";

const descriptionValidator = (val) =>
  /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9_ ]{1,40}$/.test(val);
const amountValidator = (val) =>
  !Number.isNaN(Number(val)) && val > 0 && val < 100000000;
const selectValidator = (val) => !!parseInt(val, 10);
const isFormReadyValidator = (val) =>
  !!(val.description.valid && val.amount.valid && val.selectValue.valid);

const formValidator = ({ type, val }) => {
  const { description, amount, select, isFormValid } = validationTypes;

  switch (type) {
    case description:
      return descriptionValidator(val);
    case amount:
      return amountValidator(val);
    case select:
      return selectValidator(val);
    case isFormValid:
      return isFormReadyValidator(val);
    default:
      return false;
  }
};

export default formValidator;
