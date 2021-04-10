/**
 * Returns all transactions sorted by creation timestamp
 * @param {array<object>} transactions The transactions in the UserData array.
 */
const sortTransactionsByTimestamp = (transactions) => {
  return transactions.sort((a, b) => a.timestamp - b.timestamp);
};

/**
 * Returns a receipt of the changes to all payer point totals in a spending operation.
 * @param {number} cost The input points from HTTP request
 * @param {array<object>} transactions The transactions in the UserData array.
 */
const getSpendingReceipt = (cost, transactions) => {
  let remainingPointsToSpend = cost;
  const receipt = [];

  if (getAvailablePointsTotal(transactions) < remainingPointsToSpend)
    throw new Error(
      `You don't have that many points. (You have ${getAvailablePointsTotal(
        transactions
      )} points)`
    );

  for (transaction of sortTransactionsByTimestamp(transactions)) {
    const currentAvailablePoints = getCurrentTransactionAvailablePoints(
      transaction
    );

    if (currentAvailablePoints === 0) continue;

    // remainingPointsToSpend is greater than the current transaction available points
    if (remainingPointsToSpend > currentAvailablePoints) {
      remainingPointsToSpend -= currentAvailablePoints;
      transaction.spentPoints = transaction.points;
      receipt.push({
        payer: transaction.payer,
        points: -Math.abs(transaction.points),
      });
      // remainingPointsToSpend is greater than the current transaction available points
    } else {
      transaction.spentPoints += remainingPointsToSpend;
      receipt.push({
        payer: transaction.payer,
        points: -Math.abs(remainingPointsToSpend),
      });
      break;
    }
  }
  // merges payers on receipt, and returns merged data
  return receipt.reduce((a, c) => {
    let x = a.find((e) => e.payer === c.payer);
    if (!x) a.push(Object.assign({}, c));
    else x.points += c.points;
    return a;
  }, []);
};

/**
 * Returns the total of user's available points.
 * @param {array<object>} transactions The transactions in the UserData array.
 */
const getAvailablePointsTotal = (transactions) => {
  let grandTotal = 0;
  for (transaction of transactions) {
    grandTotal += transaction.points - transaction.spentPoints;
  }
  return grandTotal;
};

/**
 * Returns an itemized total of user's available points based on payer.
 * @param {array<object>} transactions The transactions in the UserData array.
 */
const getAvailablePointsByPayer = (transactions) => {
  const pointsByPayer = {};
  for (transaction of transactions) {
    console.log(transaction);
    if (!pointsByPayer.hasOwnProperty(transaction.payer)) {
      pointsByPayer[transaction.payer] =
        transaction.points - transaction.spentPoints;
    } else {
      pointsByPayer[transaction.payer] +=
        transaction.points - transaction.spentPoints;
    }
  }
  return pointsByPayer;
};

/**
 * Returns a total of avialable points for a particular transaction.
 * @param {object} transaction The transaction being analyzed for point availibility.
 */
const getCurrentTransactionAvailablePoints = (transaction) => {
  return transaction.points - transaction.spentPoints;
};

module.exports = {
  sortTransactionsByTimestamp,
  getSpendingReceipt,
  getAvailablePointsByPayer,
  getAvailablePointsTotal,
};
