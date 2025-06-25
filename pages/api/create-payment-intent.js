// pages/api/create-payment-intent.js
import { createPaymentIntent } from '../../payment.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, description } = req.body;
  if (typeof amount !== 'number' || !description) {
    return res.status(400).json({ error: 'Missing amount or description' });
  }

  try {
    const { data } = await createPaymentIntent(amount, description);
    return res.status(200).json({ redirect_url: data.redirect_url });
  } catch (err) {
    console.error('Payment Intent Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
