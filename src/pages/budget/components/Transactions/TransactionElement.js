import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../../../components";
import { TransactionListElement } from "./Transactions.css";
import formatCurrency from "../../../../utils/formatCurrency";

const TransactionElement = ({ id, description, amount, date, category }) => {
  return (
    <TransactionListElement onClick={() => console.log(amount)}>
      <td>{description}</td>
      <td>{category}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{date}</td>
      <td>
        <Button type="regular" to={`/budget/transaction/delete/${id}`}>
          &times;
        </Button>
      </td>
    </TransactionListElement>
  );
};

export default TransactionElement;

TransactionElement.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
