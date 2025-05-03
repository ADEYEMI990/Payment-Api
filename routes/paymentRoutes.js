const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST: Initiate a payment
router.post('/', paymentController.initiatePayment);

// GET: Retrieve the status of a payment transaction
router.get('/:id', paymentController.getPaymentStatus);

module.exports = router;
