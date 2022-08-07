import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { List, ParentCategoryElement, ChildCategories } from "./index";
import formatCurrency from "../../../utils";

const ParentCategory = ({
  id,
  name,
  active,
  onclick,
  items,
  noExtend,
  summary,
}) => {
  const { budgetedCategories } = useSelector((store) => store.parentCategories);
  const { spentAmount } = useSelector((store) => store.transactions);
  const exceed = useMemo(() => {
    return spentAmount.parentCategories &&
      spentAmount.parentCategories[id] > budgetedCategories[id]
      ? "true"
      : null;
  }, [spentAmount, budgetedCategories]);

  function handleTransactions() {
    if (active) {
      return onclick([]);
    }
    if (summary) {
      return onclick(items.map((i) => i.parentCategoryId));
    }
    return onclick([id]);
  }

  return (
    <ParentCategoryElement key={id} exceed={exceed}>
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
          {summary
            ? formatCurrency(budgetedCategories.total)
            : formatCurrency(budgetedCategories[id])}
        </span>
        <span className="data-field spent">
          {summary
            ? formatCurrency(spentAmount?.parentCategories?.totalSpent)
            : formatCurrency(spentAmount.parentCategories[id])}
        </span>
      </div>
      {active && !summary && !noExtend && (
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
  summary: false,
};

ParentCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onclick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  noExtend: PropTypes.bool.isRequired,
  summary: PropTypes.bool,
};
