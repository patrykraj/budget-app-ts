import React from "react";
import PropTypes from "prop-types";

import TransactionsList from "./TransactionsList";
import { Button } from "../../../../components";
import {
  buttonTypes,
  navigationStrings,
  transactionStrings,
} from "../../../../static/constants";
import { TransactionsWrapper } from "./Transactions.css";

const Transactions = ({ activeParentCategoryId, transactions }) => {
  const { regular } = buttonTypes;
  const { budgetTransactionNew } = navigationStrings;
  const { addNewTransaction } = transactionStrings;

  return (
    <TransactionsWrapper>
      <Button type={regular} to={budgetTransactionNew}>
        {addNewTransaction}
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
