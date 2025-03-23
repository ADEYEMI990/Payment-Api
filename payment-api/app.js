const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Payment routes (with versioning)
app.use('/api/v1/payments', paymentRoutes);

// Export the app for Vercel (as a serverless function)
module.exports = (req, res) => {
  app(req, res);
};
