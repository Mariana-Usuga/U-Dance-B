const { Router } = require('express');

const {
  makePaymentHandlers,
  // makePaymentEveryMonthHandlers
} = require('./payment.controller');
const { isAuthenticated } = require('../../auth/auth.services');

const router = Router();

router.post('/make-payment', isAuthenticated, makePaymentHandlers);
// router.post('/make-payment-everyMonth', makePaymentEveryMonthHandlers);


module.exports = router;
