export function getDate(selectedTransaction, update) {
  if (selectedTransaction && update) return new Date(selectedTransaction.date);
  return new Date();
}

export function getMaxDate() {
  return new Date(new Date() + 1);
}

function modifyZeroValuesDate(month) {
  if (month < 9) return "0";
  return "";
}

export function prepareDates(selectedDate) {
  const date = selectedDate ? new Date(selectedDate) : new Date();
  const startDate = `${date.getFullYear()}-${modifyZeroValuesDate(
    date.getMonth()
  )}${date.getMonth() + 1}`;
  let endDate;

  if (date.getMonth() === 11) {
    endDate = `${date.getFullYear() + 1}-01`;
  } else {
    endDate = `${date.getFullYear()}-${modifyZeroValuesDate(date.getMonth())}${
      date.getMonth() + 2
    }`;
  }

  return { startDate, endDate };
}

export function validatePayloadDate(payload, selectedDates) {
  const { startDate, endDate } = selectedDates;

  const payloadDateTime = new Date(payload.date).getTime();
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();

  return payloadDateTime >= startDateTime && payloadDateTime < endDateTime;
}
