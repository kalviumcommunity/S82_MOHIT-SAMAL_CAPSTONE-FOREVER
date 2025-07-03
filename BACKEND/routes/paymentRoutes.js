const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-stripe-session", async (req, res) => {
  const { cartItems, successUrl, cancelUrl } = req.body;

  try {
    const line_items = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          line_items.push({
            price_data: {
              currency: "inr",
              product_data: {
                name: `Product: ${productId} | Size: ${size}`,
              },
              unit_amount: 50000, // ₹500 (in paise)
            },
            quantity,
          });
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
