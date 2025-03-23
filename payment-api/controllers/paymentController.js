const axios = require('axios');
require('dotenv').config();

// Paystack API base URL
const PAYSTACK_API_URL = 'https://api.paystack.co/transaction';

// Initiate Payment
exports.initiatePayment = async (req, res) => {
  const { name, email, amount } = req.body;

  try {
    const response = await axios.post(
      `${PAYSTACK_API_URL}/initialize`,
      {
        email,
        amount: amount * 100, // Paystack expects the amount in kobo (1 NGN = 100 Kobo)
        currency: 'NGN',
        callback_url: 'https://your-redirect-url.com', // Define your redirect URL
        metadata: {
          customer_name: name,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return res.status(200).json({
      message: 'Payment initiated successfully',
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error initiating payment',
      error: error.response ? error.response.data : error.message,
    });
  }
};

// Get Payment Status
exports.getPaymentStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${PAYSTACK_API_URL}/verify/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return res.status(200).json({
      message: 'Payment status fetched successfully',
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching payment status',
      error: error.response ? error.response.data : error.message,
    });
  }
};
