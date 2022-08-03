import React from "react";
import PropTypes from "prop-types";
import formatCurrency from "../../../utils/formatCurrency";

const Transactions = ({ transactions, activeParentCategoryId }) => {
  if (!transactions.length || !activeParentCategoryId.length) return null;

  return (
    <ul>
      {transactions.map(
        (item) =>
          activeParentCategoryId.includes(item.category.parentCategoryId) && (
            <li key={item.id}>
              {`${item.description}, Cena: ${formatCurrency(item.amount)}`}
            </li>
          )
      )}
    </ul>
  );
};

export default React.memo(Transactions);

Transactions.defaultProps = {
  transactions: [],
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
