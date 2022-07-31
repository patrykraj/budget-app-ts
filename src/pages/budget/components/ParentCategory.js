import React from "react";
import PropTypes from "prop-types";
import { List, ParentCategoryElement } from "./ListElements.css";

function ParentCategory({
  id,
  name,
  active,
  setActive,
  items,
  noExtend,
  transactions,
}) {
  function getExpenses() {
    return transactions.reduce((acc, transaction) => {
      return (acc += transaction.amount);
    }, 0);
  }

  function getAmount(categoryId) {
    return transactions.reduce((acc, transaction) => {
      if (categoryId === transaction.categoryId)
        return (acc += transaction.amount);
      return acc;
    }, 0);
  }

  function handleParentCategories() {
    if (active) {
      return setActive(null);
    }
    return setActive(id);
  }

  return (
    <ParentCategoryElement key={id}>
      <div
        onClick={handleParentCategories}
        onKeyDown={handleParentCategories}
        tabIndex="0"
        role="button"
        aria-pressed="false"
      >
        <span>{name}</span>
        <span>{getExpenses()}</span>
      </div>
      {active && !noExtend && (
        <List>
          {items.map(
            (category) =>
              id === category.parentCategoryId && (
                <li key={category.id}>
                  <span>{category.name}</span>
                  <span>{getAmount(category.id)}</span>
                </li>
              )
          )}
        </List>
      )}
    </ParentCategoryElement>
  );
}

export default ParentCategory;

ParentCategory.defaultProps = {
  items: [],
  transactions: [],
};

ParentCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  noExtend: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
};
