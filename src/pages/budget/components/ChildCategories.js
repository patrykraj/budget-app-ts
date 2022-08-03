import React from "react";
import PropTypes from "prop-types";
import formatCurrency from "../../../utils/formatCurrency";

const ChildCategories = ({ items, id, getAmount }) => {
  return items.map(
    (category) =>
      id === category.parentCategoryId && (
        <li key={category.id}>
          <span>{category.name}</span>
          <span>{formatCurrency(getAmount(category.id))}</span>
        </li>
      )
  );
};

export default React.memo(ChildCategories);

ChildCategories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
  getAmount: PropTypes.func.isRequired,
};
