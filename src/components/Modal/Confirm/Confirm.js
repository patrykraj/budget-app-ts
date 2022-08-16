import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../Loader";
import Button from "../../Button";
import { deleteTransaction } from "../../../store/features/transactionsSlice";

const FallbackElement = () => <p>Nie znaleziono transakcji</p>;

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

  const handleDeleteElement = async () => {
    await dispatch(deleteTransaction(id));
    navigate("/budget");
  };

  return (
    <>
      <p>Czy na pewno chcesz usunąć {description}?</p>
      <div>
        <Button type="regular" onclick={handleDeleteElement}>
          usuń
        </Button>
        <Button type="regular" onclick={() => navigate(-1)}>
          anuluj
        </Button>
      </div>
    </>
  );
};

export default Confirm;
