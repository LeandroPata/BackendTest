const express = require('express');
const router = express.Router();

const PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(SECRET_KEY);

router.post('/intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, 
            currency: 'eur',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ paymentIntent: paymentIntent.client_secret});
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
});

router.post('/setup', async (req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ setupIntent: setupIntent.client_secret});
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
});


module.exports = router
