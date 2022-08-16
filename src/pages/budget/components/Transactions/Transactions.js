import React from "react";
import PropTypes from "prop-types";

import TransactionsList from "./TransactionsList";
import { Button } from "../../../../components";
import { buttonTypes } from "../../../../static/constants";
import { TransactionsWrapper } from "./Transactions.css";

const Transactions = ({ activeParentCategoryId, transactions }) => {
  const { regular } = buttonTypes;

  return (
    <TransactionsWrapper>
      <Button type={regular} to="/budget/transaction/new">
        Add new transaction
      </Button>
      <TransactionsList
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
