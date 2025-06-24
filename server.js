// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ZIINA_API_KEY = process.env.ZIINA_API_KEY;

app.post('/create-payment', async (req, res) => {
  try {
    const { fullName, email, amount, service } = req.body;

    const response = await axios.post(
      'https://api-v2.ziina.com/api/payment_intent',
      {
        amount,
        currency: 'AED',
        success_url: 'https://almahadt-typing.vercel.app/success.html',
        cancel_url: 'https://almahadt-typing.vercel.app/cancel.html',
        test: true,
        metadata: {
          customer_name: fullName,
          customer_email: email,
          service: service || 'Unknown'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ZIINA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ url: response.data.redirect_url });
  } catch (err) {
    console.error('❌ Ziina Payment Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
