import React from "react";
import PropTypes from "prop-types";

import TransactionElement from "./TransactionElement";
import { sortTransactions } from "../../../../utils";

const TransactionsList = ({ transactions, activeParentCategoryId }) => {
  if (!transactions.length || !activeParentCategoryId.length) return null;

  const sortedTransactions = sortTransactions([...transactions], "date");

  return (
    <table>
      <thead>
        <tr>
          <th>Opis</th>
          <th>Kategoria</th>
          <th>Kwota</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map(
          (item) =>
            activeParentCategoryId.includes(item.category.parentCategoryId) && (
              <TransactionElement
                key={item.id}
                id={item.id}
                description={item.description}
                amount={item.amount}
                date={item.date.slice(0, 10)}
                category={item.category.name}
              />
            )
        )}
      </tbody>
    </table>
  );
};

export default React.memo(TransactionsList);

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
