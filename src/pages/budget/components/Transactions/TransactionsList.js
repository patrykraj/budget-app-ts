import React from "react";
import PropTypes from "prop-types";
import formatCurrency from "../../../../utils/formatCurrency";

const TransactionsList = ({ transactions, activeParentCategoryId }) => {
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

export default React.memo(TransactionsList);

TransactionsList.defaultProps = {
  transactions: [],
};

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
