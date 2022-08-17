import React, { useState } from "react";
import PropTypes from "prop-types";

import TransactionElement from "./TransactionElement";
import { TransactionsHeader } from "./Transactions.css";
import { sortTransactions } from "../../../../utils";
import { transactionStrings } from "../../../../static/constants";

const TransactionsTable = ({ transactions, activeParentCategoryId }) => {
  const [sortOrder, setSortOrder] = useState({
    value: "date",
    asc: {},
  });
  if (!transactions.length || !activeParentCategoryId.length) return null;

  const sortedTransactions = sortTransactions([...transactions], sortOrder);
  const { transactionsHeaders } = transactionStrings;

  return (
    <table>
      <thead>
        <tr>
          {Object.values(transactionsHeaders).map(({ header, value }) => (
            <TransactionsHeader
              key={header}
              onClick={() =>
                setSortOrder({
                  value,
                  asc: {
                    [value]: !sortOrder.asc[value],
                  },
                })
              }
            >
              {header}
            </TransactionsHeader>
          ))}
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

export default React.memo(TransactionsTable);

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
