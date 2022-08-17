import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../../../components";
import { TransactionListElement } from "./Transactions.css";
import formatCurrency from "../../../../utils/formatCurrency";
import { buttonTypes } from "../../../../static/constants";

const TransactionElement = ({ id, description, amount, date, category }) => {
  const { cross } = buttonTypes;

  return (
    <TransactionListElement onClick={() => {}}>
      <td>{description}</td>
      <td>{category}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{date}</td>
      <td>
        <Button type={cross} to={`/budget/transaction/delete/${id}`} />
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
