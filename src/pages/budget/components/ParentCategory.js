import React from "react";
import PropTypes from "prop-types";
import { List, ParentCategoryElement } from "./ListElements.css";
import formatCurrency from "../../../utils/formatCurrency";
import { ChildCategories } from "./index";

const ParentCategory = ({
  id,
  name,
  active,
  onclick,
  items,
  noExtend,
  transactions,
  showAllElements,
}) => {
  const getAmount = (categoryId) => {
    return transactions.reduce((acc, transaction) => {
      if (categoryId === transaction.categoryId)
        return (acc += transaction.amount);
      return acc;
    }, 0);
  };

  function getExpenses() {
    return transactions.reduce((acc, transaction) => {
      return (acc += transaction.amount);
    }, 0);
  }

  function handleTransactions() {
    if (active) {
      return onclick([]);
    }
    if (showAllElements) {
      return onclick(items.map((i) => i.parentCategoryId));
    }
    return onclick([id]);
  }

  return (
    <ParentCategoryElement key={id}>
      <div
        className="parent-category-container"
        onClick={handleTransactions}
        onKeyDown={handleTransactions}
        tabIndex="0"
        role="button"
        aria-pressed="false"
      >
        <span>{name}</span>
        <span>{formatCurrency(getExpenses())}</span>
      </div>
      {active && !noExtend && (
        <List>
          <ChildCategories items={items} id={id} getAmount={getAmount} />
        </List>
      )}
    </ParentCategoryElement>
  );
};

export default React.memo(ParentCategory);

ParentCategory.defaultProps = {
  items: [],
  transactions: [],
  showAllElements: false,
};

ParentCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onclick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  noExtend: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
  showAllElements: PropTypes.bool,
};
