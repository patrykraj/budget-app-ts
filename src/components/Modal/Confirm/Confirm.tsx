import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/";
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
  const { id } = useParams();

  if (!id || Number.isNaN(id)) return <FallbackElement />;
  const convertedId = parseInt(id, 10);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { transactions, isTransactionsLoading } = useAppSelector(
    (store) => store.transactions
  );

  if (isTransactionsLoading) return <Loader />;

  const description = transactions.find(
    (transaction) => transaction.id === convertedId
  )?.description;

  if (!description) return <FallbackElement />;

  const { confirm, cancel, deleteConfirmation } = confirmStrings;
  const { regular } = buttonTypes;
  const handleDeleteElement = async () => {
    await dispatch(deleteTransaction(convertedId));
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
