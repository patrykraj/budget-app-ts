import React from "react";
import PropTypes from "prop-types";

import TransactionsTable from "./TransactionsTable";
import { TransactionsWrapper } from "./Transactions.css";
import TransactionsTopBar from "./TransactionsTopBar";

const Transactions = ({ activeParentCategoryId, transactions }) => {
  return (
    <TransactionsWrapper>
      <TransactionsTopBar />
      <TransactionsTable
        transactions={transactions}
        activeParentCategoryId={activeParentCategoryId}
      />
    </TransactionsWrapper>
  );
};

export default Transactions;

Transactions.propTypes = {
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
