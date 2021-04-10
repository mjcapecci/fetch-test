const express = require('express');
const router = express.Router();
const UserData = require('../UserData');
const { getAvailablePointsByPayer, getSpendingReceipt } = require('../helpers');
const validate = require('../middleware/validate');
const pointsRules = require('../middleware/rules/pointsRules');

router.post('/spend', pointsRules(), validate, (req, res) => {
  const { points } = req.body;
  try {
    const receipt = getSpendingReceipt(points, UserData);
    res.status(200).json(receipt);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get('/totals', (req, res) => {
  res.status(200).json(getAvailablePointsByPayer(UserData));
});

module.exports = router;
