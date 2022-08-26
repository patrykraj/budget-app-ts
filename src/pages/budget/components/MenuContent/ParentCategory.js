import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import ChildCategory from "./ChildCategory";
import { formatCurrency } from "../../../../utils";
import { List, ParentCategoryElement } from "./ListElements.css";
import { setActiveParentCategoryId } from "../../../../store/features/parentCategoriesSlice";

const ParentCategory = ({ id, name, active, items, noExtend, summary }) => {
  const dispatch = useDispatch();
  const { budgetedParentCategories } = useSelector(
    (store) => store.parentCategories
  );
  const { spentAmount } = useSelector((store) => store.transactions);
  const exceed = useMemo(() => {
    if (summary)
      return !!(
        spentAmount.parentCategories &&
        spentAmount.parentCategories.totalSpent > budgetedParentCategories.total
      );
    return !!(
      spentAmount.parentCategories &&
      spentAmount.parentCategories[id] > budgetedParentCategories[id]
    );
  }, [spentAmount, budgetedParentCategories]);

  const handleTransactions = useCallback(() => {
    if (active) {
      return dispatch(setActiveParentCategoryId([]));
    }
    if (summary) {
      return dispatch(
        setActiveParentCategoryId(items.map((i) => i.parentCategoryId))
      );
    }
    return dispatch(setActiveParentCategoryId([id]));
  }, [id, active, summary]);

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
            ? formatCurrency(budgetedParentCategories.total)
            : formatCurrency(budgetedParentCategories[id])}
        </span>
        <span className="data-field spent">
          {summary
            ? formatCurrency(spentAmount?.parentCategories?.totalSpent)
            : formatCurrency(spentAmount.parentCategories[id])}
        </span>
      </div>
      {active && !summary && !noExtend && (
        <List>
          {items.map((category) =>
            id === category.parentCategoryId ? (
              <ChildCategory
                key={category.id}
                category={category}
                id={id}
                spentAmount={spentAmount}
              />
            ) : null
          )}
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
  items: PropTypes.arrayOf(PropTypes.shape({})),
  noExtend: PropTypes.bool.isRequired,
  summary: PropTypes.bool,
};
