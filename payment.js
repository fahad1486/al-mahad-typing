require('dotenv').config();
const axios = require('axios');

const API_BASE = 'https://api-v2.ziina.com/api';
const ziinaApiKey = process.env.ZIINA_API_KEY;

async function createPaymentIntent(amountFils = 9900) {
  try {
    const res = await axios.post(
      `${API_BASE}/payment_intent`,
      {
        amount: amountFils,            // in fils: 99 AED = 9900
        currency_code: 'AED',
        message: 'Passport Renewal – Al Mahad Typing',
        success_url: 'https://al-mahad-typing.vercel.app/success',
        cancel_url: 'https://al-mahad-typing.vercel.app/cancel',
        failure_url: 'https://al-mahad-typing.vercel.app/failure',
        test: true,
        transaction_source: 'directApi',
        allow_tips: false
      },
      {
        headers: {
          Authorization: `Bearer ${ziinaApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Payment Link:', res.data.redirect_url);
    return res.data;
  } catch (err) {
    console.error('❌ Ziina API Error:', err.response?.data || err.message);
    throw err;
  }
}

createPaymentIntent();
