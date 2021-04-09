const express = require('express');
const router = express.Router();
const UserData = require('../UserData');
const { sortByTimestamp } = require('../helpers');

router.get('/', (req, res) => {
  res.status(200).json(sortByTimestamp(UserData));
});

router.post('/', (req, res) => {
  const { payer, points } = req.body;

  UserData.push({ payer, points, timestamp: Date.now() });

  res.status(200).json(UserData);
});

module.exports = router;
