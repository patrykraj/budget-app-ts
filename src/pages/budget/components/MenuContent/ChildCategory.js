import React from "react";
import PropTypes from "prop-types";
import formatCurrency from "../../../../utils/formatCurrency";

const ChildCategory = ({ category, spentAmount }) => (
  <li>
    <span>{category.name}</span>
    <span className="data-field">{formatCurrency(category.budget)}</span>
    <span
      className={`data-field ${
        spentAmount[category.id] > category.budget ? "exceed" : ""
      }`}
    >
      {formatCurrency(spentAmount[category.id] || 0)}
    </span>
  </li>
);

export default React.memo(ChildCategory);

ChildCategory.propTypes = {
  category: PropTypes.shape({
    parentCategoryId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
  }).isRequired,
  spentAmount: PropTypes.shape({}).isRequired,
};
