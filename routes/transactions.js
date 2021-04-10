const express = require('express');
const router = express.Router();
const moment = require('moment');
const UserData = require('../UserData');
const validate = require('../middleware/validate');
const transactionRules = require('../middleware/rules/transactionRules');

router.post('/', transactionRules(), validate, (req, res) => {
  const newTransaction = {
    payer: req.body.payer,
    points: req.body.points,
    spentPoints: 0,
    timestamp: Date.now(),
  };

  UserData.push(newTransaction);

  res.status(200).json({
    payer: newTransaction.payer,
    points: newTransaction.points,
    timestamp: moment(Date.now()).format('YYYY-DD-MMTHH:MM:ss'),
  });
});

module.exports = router;
