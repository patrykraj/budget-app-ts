import React from "react";
import PropTypes from "prop-types";

import { TransactionsList } from ".";
import { Button } from "../../../../components";
import { buttonTypes } from "../../../../static/constants";

const Transactions = ({ activeParentCategoryId, transactions }) => {
  const { regular } = buttonTypes;

  return (
    <div>
      <Button type={regular} to="/budget/transaction/new">
        Add new transaction
      </Button>
      <TransactionsList
        transactions={transactions}
        activeParentCategoryId={activeParentCategoryId}
      />
    </div>
  );
};

export default Transactions;

Transactions.defaultProps = {
  transactions: [],
};

Transactions.propTypes = {
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
};
