import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { List, ParentCategoryElement } from "./ListElements.css";
import formatCurrency from "../../../utils";
import { ChildCategories } from "./index";

const ParentCategory = ({
  id,
  name,
  active,
  onclick,
  items,
  noExtend,
  showAllElements,
}) => {
  const { budgetedCategories } = useSelector((store) => store.parentCategories);
  const { spentAmount } = useSelector((store) => store.transactions);

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
        <span className="data-field">
          {showAllElements
            ? formatCurrency(budgetedCategories.total)
            : formatCurrency(budgetedCategories[id])}
        </span>
        <span className="data-field">
          {showAllElements
            ? formatCurrency(spentAmount?.parentCategories?.totalSpent)
            : formatCurrency(spentAmount.parentCategories[id])}
        </span>
      </div>
      {active && !noExtend && (
        <List>
          <ChildCategories items={items} id={id} spentAmount={spentAmount} />
        </List>
      )}
    </ParentCategoryElement>
  );
};

export default React.memo(ParentCategory);

ParentCategory.defaultProps = {
  items: [],
  showAllElements: false,
};

ParentCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onclick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  noExtend: PropTypes.bool.isRequired,
  showAllElements: PropTypes.bool,
};
