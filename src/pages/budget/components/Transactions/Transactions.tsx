import React, { Suspense } from "react";
import PropTypes from "prop-types";

import { Loader } from "../../../../components";
import { TransactionsWrapper } from "./Transactions.css";
import TransactionsTopBar from "./TransactionsTopBar";

const TransactionsTable = React.lazy(() => import("./TransactionsTable"));

const Transactions = ({ activeParentCategoryId, transactions }) => {
  return (
    <TransactionsWrapper>
      <TransactionsTopBar />
      <Suspense fallback={<Loader />}>
        <TransactionsTable
          transactions={transactions}
          activeParentCategoryId={activeParentCategoryId}
        />
      </Suspense>
    </TransactionsWrapper>
  );
};

export default Transactions;

Transactions.propTypes = {
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
