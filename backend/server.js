const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'https://payment-stripe-pzy3.vercel.app/', // Replace with your actual frontend domain
    methods: 'POST',
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    const items = req.body.items;

    // Validate that items is an array and not empty before proceeding

    let lineItems = [];
    items.forEach((item) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: "https://payment-stripe-pzy3.vercel.app/success", // Replace with your actual success URL
            cancel_url: "https://payment-stripe-pzy3.vercel.app/cancel",   // Replace with your actual cancel URL
        });

        res.json({
            url: session.url
        });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
