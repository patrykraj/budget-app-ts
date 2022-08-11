import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../Loader";
import { formValidator, InputErrorHandler } from "./components";
import formInputs from "../../../static/formInputs";
import { formStrings, validationTypes } from "../../../static/constants";
import { getMaxDate } from "../../../utils";

function Form() {
  const [transactionsDate, setTransactionsDate] = useState(new Date());
  const [formValues, setFormValues] = useState({
    description: {
      value: "",
      touched: false,
      valid: false,
    },
    amount: {
      value: "",
      touched: false,
      valid: false,
    },
    selectValue: {
      value: null,
      valid: false,
    },
  });

  const { dateFormat, defaultCategoryId } = formStrings;
  const { select, isFormValid } = validationTypes;
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isValid = formValidator({
      type: isFormValid,
      val: formValues,
    });
    console.log(isValid);
  };

  useEffect(() => {
    if (!isCategoriesLoading)
      setFormValues({
        ...formValues,
        selectValue: {
          value: selectCategories[1].categories[0].id || defaultCategoryId,
          valid: true,
        },
      });
  }, [selectCategories]);

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
      <button type="submit" onClick={(e) => handleSubmitForm(e)}>
        Dodaj
      </button>
    </form>
  );
}

export default Form;
