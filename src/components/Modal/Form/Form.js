import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../Loader";
import formInputs from "../../../static/formInputs";
import { formStrings } from "../../../static/constants";
import getMaxDate from "../../../utils/maxDate";

function Form() {
  const [startDate, setStartDate] = useState(new Date());
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

  const selectOptionsElement = useMemo(
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

  if (isCategoriesLoading) return <Loader />;

  const { dateFormat } = formStrings;

  return (
    <form>
      {formInputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id}>{input.content}</label>
          <input {...input} />
        </div>
      ))}
      <div>
        <select name="category" id="categories">
          {selectOptionsElement}
        </select>
      </div>
      <div>
        <DatePicker
          dateFormat={dateFormat}
          maxDate={getMaxDate()}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </form>
  );
}

export default Form;
