// pages/api/create-payment-intent.js
const { createPaymentIntent } = require('../../payment.js');

module.exports = async function handler(req, res) {
  // 1) Only POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2) Parse & validate
  const { amount } = req.body;           // amount in AED, e.g. 99
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // 3) Convert AED → fils
  const amountFils = Math.round(amount * 100);

  try {
    // 4) Call your helper
    const data = await createPaymentIntent(amountFils);

    // 5) Return ONLY JSON
    return res.status(200).json({ redirect_url: data.redirect_url });
  } catch (err) {
    console.error('API handler error:', err);
    return res.status(500).json({ error: 'Payment creation failed' });
  }
};
