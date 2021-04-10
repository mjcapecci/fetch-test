const { body } = require('express-validator');

module.exports = function transactionRules() {
  return [
    body('payer')
      .notEmpty()
      .withMessage('Payer must not be empty.')
      .isLength({ max: 255 })
      .withMessage('Payer must be less than 255 characters'),
    body('points')
      .notEmpty()
      .withMessage('Points must not be empty.')
      .isNumeric()
      .withMessage('Points must be a valid number')
      .isLength({ max: 20 })
      .withMessage('Points must be less than 20 characters'),
  ];
};
