const sortByTimestamp = (data) => {
  return data.sort((a, b) => a.timestamp - b.timestamp);
};

const getPayerPointTotals = (data) => {
  const totals = {};
  for (const transaction of data) {
    if (!totals.hasOwnProperty(transaction.payer)) {
      totals[transaction.payer] = transaction.points;
    } else {
      totals[transaction.payer] += transaction.points;
    }
  }
  return totals;
};

module.exports = { sortByTimestamp, getPayerPointTotals };
