// payment.js
require('dotenv').config();
const axios = require('axios');

const API_BASE = 'https://api-v2.ziina.com/api';
const ZIINA_API_KEY = process.env.ZIINA_API_KEY;

async function createPaymentIntent(amountFils = 9900) {
  // amountFils is in fils: 99 AED → 9900
  try {
    const res = await axios.post(
      `${API_BASE}/payment_intent`,
      {
        amount: amountFils,
        currency_code: 'AED',
        message: 'Passport Renewal – Al Mahad Typing',
        success_url: 'https://al-mahad-typing.vercel.app/success',
        cancel_url:  'https://al-mahad-typing.vercel.app/cancel',
        failure_url: 'https://al-mahad-typing.vercel.app/failure',
        test: true,
        transaction_source: 'directApi',
        allow_tips: false
      },
      {
        headers: {
          Authorization: `Bearer ${ZIINA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // res.data === { redirect_url: 'https://…', /* other fields… */ }
    return res.data;
  } catch (err) {
    console.error('❌ Ziina API Error:', err.response?.data || err.message);
    throw err;
  }
}

// EXPORT the helper; no standalone invocation here!
module.exports = { createPaymentIntent };
