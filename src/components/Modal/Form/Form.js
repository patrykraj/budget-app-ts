import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Loader, Button } from "../../index";
import { formValidator, InputErrorHandler } from "./components";
import formInputs from "../../../static/formInputs";
import {
  formStrings,
  validationTypes,
  buttonTypes,
} from "../../../static/constants";
import { getDate, getMaxDate } from "../../../utils";
import {
  addTransaction,
  updateTransaction,
} from "../../../store/features/transactionsSlice";

function Form({ transactionUpdate }) {
  let selectedTransaction = null;
  let { id } = useParams();
  const { transactions, isTransactionsLoading } = useSelector(
    (store) => store.transactions
  );
  if (transactionUpdate) {
    id = parseInt(id, 10);
    selectedTransaction = transactions.find(
      (transaction) => transaction.id === id
    );
  }

  const { dateFormat, defaultCategoryId, submitButton, updateButton } =
    formStrings;
  const { select, isFormValid } = validationTypes;
  const { regular } = buttonTypes;

  const [transactionsDate, setTransactionsDate] = useState(
    getDate(selectedTransaction, transactionUpdate)
  );
  const [formValues, setFormValues] = useState({
    description: {
      value: selectedTransaction?.description || "",
      touched: false,
      valid: !!selectedTransaction || false,
    },
    amount: {
      value: selectedTransaction?.amount || "",
      touched: false,
      valid: !!selectedTransaction || false,
    },
    selectValue: {
      value: selectedTransaction?.category.id || defaultCategoryId,
      valid: true,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategories, isCategoriesLoading } = useSelector(
    (store) => store.parentCategories
  );

  const selectCategories = useMemo(
    () =>
      allCategories.reduce((acc, category) => {
        if (acc[category.parentCategory.id]) {
          return {
            ...acc,
            [category.parentCategory.id]: {
              ...acc[category.parentCategory.id],
              categories: [
                ...acc[category.parentCategory.id].categories,
                { ...category.category },
              ],
            },
          };
        }
        return {
          ...acc,
          [category.parentCategory.id]: {
            name: category.parentCategory.name,
            categories: [{ ...category.category }],
          },
        };
      }, {}),
    [allCategories]
  );

  const selectOptionsElements = useMemo(
    () =>
      Object.entries(selectCategories).map(([key, properties]) => {
        return (
          <optgroup label={properties.name} key={key}>
            {properties.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
        );
      }),
    [selectCategories]
  );

  const handleSubmitForm = async (e, update) => {
    e.preventDefault();
    const isValid = formValidator({
      type: isFormValid,
      val: formValues,
    });
    if (!isValid) throw new Error("FORM INVALID!");

    const transformDate = new Date(
      transactionsDate.setMinutes(
        transactionsDate.getMinutes() +
          Math.abs(transactionsDate.getTimezoneOffset())
      )
    );

    const data = {
      id: (update && id) || Math.floor(Math.random() * 1000000),
      description: formValues.description.value,
      amount: Number(formValues.amount.value),
      categoryId: Number(formValues.selectValue.value),
      date: transformDate,
      category: {
        ...allCategories.find(
          (category) =>
            category.categoryId === Number(formValues.selectValue.value)
        ).category,
      },
    };

    if (update) {
      await dispatch(updateTransaction(data));
    } else {
      await dispatch(addTransaction(data));
    }
    navigate(-1);
  };

  if (isCategoriesLoading) return <Loader />;

  return (
    <form>
      {formInputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id}>{input.content}</label>
          <input
            {...input}
            value={formValues[input.name].value}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [input.name]: {
                  touched: true,
                  value: e.target.value,
                  valid: formValidator({
                    type: input.name,
                    val: e.target.value,
                  }),
                },
              })
            }
          />
          <InputErrorHandler inputValues={formValues[input.name]} />
        </div>
      ))}
      <div>
        <select
          name="category"
          id="categories"
          defaultValue={selectedTransaction?.category.id || defaultCategoryId}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              selectValue: {
                value: e.target.value,
                valid: formValidator({
                  type: select,
                  val: e.target.value,
                }),
              },
            })
          }
        >
          {selectOptionsElements}
        </select>
      </div>
      <div>
        <DatePicker
          dateFormat={dateFormat}
          maxDate={getMaxDate()}
          selected={transactionsDate}
          onChange={(date) => setTransactionsDate(date)}
        />
      </div>
      <Button
        type={regular}
        onclick={(e) => handleSubmitForm(e, transactionUpdate)}
        loading={isTransactionsLoading}
      >
        {transactionUpdate ? updateButton : submitButton}
      </Button>
    </form>
  );
}

export default Form;

Form.defaultProps = {
  transactionUpdate: false,
};

Form.propTypes = {
  transactionUpdate: PropTypes.bool,
};
