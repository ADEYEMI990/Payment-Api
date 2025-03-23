const request = require('supertest');
const app = require('../app');

describe('Payment API Tests', () => {
  it('should initiate payment successfully', async () => {
    const response = await request(app)
      .post('/api/v1/payments')
      .send({
        "name": "Adeyemi Ade",
        "email": "adeyemi990@gmail.com",
        "amount": 1000
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Payment initiated successfully');
  });

  it('should return payment status successfully', async () => {
    const paymentId = 'paystack_transaction_id'; // Replace with an actual ID from Paystack
    const response = await request(app).get(`/api/v1/payments/${paymentId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Payment status fetched successfully');
  });
});
