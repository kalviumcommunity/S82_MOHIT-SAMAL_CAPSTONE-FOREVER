const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-stripe-session', async (req, res) => {
  const { cartItems, successUrl, cancelUrl } = req.body;

  try {
    const line_items = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          line_items.push({
            price_data: {
              currency: 'inr',
              product_data: {
                name: `Product: ${productId} | Size: ${size}`,
              },
              unit_amount: 50000, // in paise => ₹500. You can customize this.
            },
            quantity,
          });
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt: `receipt_order_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
