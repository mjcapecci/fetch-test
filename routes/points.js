const express = require('express');
const router = express.Router();
const UserData = require('../UserData');
const { getPayerPointTotals } = require('../helpers');

router.get('/totals', (req, res) => {
  res.status(200).json(getPayerPointTotals(UserData));
});

module.exports = router;
