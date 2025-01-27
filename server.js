const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Donation = require('./models/Donation');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/donations', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// POST route for donations
app.post("/api/donate", (req, res) => {
    const { name, email, type, amount } = req.body;

    if (!name || !email || !amount) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newDonation = new Donation({
        name,
        email,
        type,
        amount,
    });

    newDonation.save()
        .then(() => {
            res.status(200).json({ message: "Donation recorded successfully!" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error saving donation", error });
        });
});

// GET route for retrieving all donations
app.get("/api/donations", (req, res) => {
    Donation.find()
        .then((donations) => {
            res.status(200).json(donations);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error fetching donation records", error });
        });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
