import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components";
import { TransactionListElement } from "./Transactions.css";
import formatCurrency from "../../../../utils/formatCurrency";
import { buttonTypes } from "../../../../static/constants";

const TransactionElement = ({ id, description, amount, date, category }) => {
  const navigate = useNavigate();
  const { cross } = buttonTypes;

  const handleRedirectToFormUpdate = () => {
    navigate(`/budget/transaction/${id}`);
  };

  return (
    <TransactionListElement onClick={handleRedirectToFormUpdate}>
      <td>{description}</td>
      <td>{category}</td>
      <td className="align-right">{formatCurrency(amount)}</td>
      <td className="align-right">{date}</td>
      <td>
        <Button type={cross} to={`/budget/transaction/delete/${id}`} />
      </td>
    </TransactionListElement>
  );
};

export default React.memo(TransactionElement);

TransactionElement.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
