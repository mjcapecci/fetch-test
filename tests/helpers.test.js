const { getSpendingReceipt } = require('../helpers');

const cost = 4000;
const transactions1 = [
  {
    payer: 'TEST PAYER 1',
    points: 4000,
    spentPoints: 0,
    timestamp: 1618019460,
  },
  {
    payer: 'TEST PAYER 2',
    points: 1000,
    spentPoints: 0,
    timestamp: 1618019461,
  },
];
const transactions2 = [
  {
    payer: 'TEST PAYER 1',
    points: 3000,
    spentPoints: 0,
    timestamp: 1618019460,
  },
  {
    payer: 'TEST PAYER 2',
    points: 1000,
    spentPoints: 0,
    timestamp: 1618019461,
  },
];

describe('getSpendingReceipt()', () => {
  it('should return values based on sample input', () => {
    expect(getSpendingReceipt(cost, transactions1)).toEqual([
      {
        payer: 'TEST PAYER 1',
        points: -4000,
      },
    ]);
    expect(getSpendingReceipt(cost, transactions2)).toEqual([
      {
        payer: 'TEST PAYER 1',
        points: -3000,
      },
      {
        payer: 'TEST PAYER 2',
        points: -1000,
      },
    ]);
  });
});
