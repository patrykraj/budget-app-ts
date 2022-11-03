import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import {
  getTransactions,
  setSelectedDates,
} from "../../../../store/features/transactionsSlice";
import { Button, FlexWrapper } from "../../../../components";
import { getMaxDate, prepareDates } from "../../../../utils";
import {
  buttonTypes,
  navigationStrings,
  transactionStrings,
} from "../../../../static/constants";

const TransactionsTopBar = () => {
  const dispatch = useDispatch();
  const {
    selectedDates: { startDate },
  } = useSelector((store) => store.transactions);

  const selectedDate = useMemo(() => new Date(startDate), [startDate]);

  const { regular } = buttonTypes;
  const { budgetTransactionNew } = navigationStrings;
  const { addNewTransaction } = transactionStrings;

  const handleChangeDates = (date) => {
    dispatch(setSelectedDates(prepareDates(date)));
    dispatch(getTransactions());
  };

  return (
    <FlexWrapper>
      <Button type={regular} to={budgetTransactionNew}>
        {addNewTransaction}
      </Button>
      <DatePicker
        portalId="root-portal"
        wrapperClassName="date-picker"
        dateFormat="MM/yyyy"
        popperPlacement="top-end"
        selected={selectedDate}
        onChange={handleChangeDates}
        maxDate={getMaxDate()}
        onKeyDown={(event) => event.preventDefault()}
        showMonthYearPicker
        required
      />
    </FlexWrapper>
  );
};

export default TransactionsTopBar;
