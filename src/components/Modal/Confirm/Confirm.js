import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../Loader";
import Button from "../../Button";
import { deleteTransaction } from "../../../store/features/transactionsSlice";
import {
  confirmStrings,
  navigationStrings,
  buttonTypes,
} from "../../../static/constants";

const FallbackElement = () => <p>{confirmStrings.transactionNotFound}</p>;

const Confirm = () => {
  let { id } = useParams();

  if (Number.isNaN(id)) return <FallbackElement />;
  id = parseInt(id, 10);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions, isTransactionsLoading } = useSelector(
    (store) => store.transactions
  );

  if (isTransactionsLoading) return <Loader />;

  const description = transactions.find(
    (transaction) => transaction.id === id
  )?.description;

  if (!description) return <FallbackElement />;

  const { confirm, cancel, deleteConfirmation } = confirmStrings;
  const { regular } = buttonTypes;
  const handleDeleteElement = async () => {
    await dispatch(deleteTransaction(id));
    navigate(navigationStrings.budget);
  };

  return (
    <>
      <p>{`${deleteConfirmation} ${description}?`}</p>
      <div>
        <Button type={regular} onclick={handleDeleteElement}>
          {confirm}
        </Button>
        <Button type={regular} onclick={() => navigate(-1)}>
          {cancel}
        </Button>
      </div>
    </>
  );
};

export default Confirm;
