const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for testing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/guesthouse_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Form Route
app.post('/contact', async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    console.log(req.body); // Log the request body to check data

    try {
        const newContact = new Contact({ firstName, lastName, email, phone, message });
        await newContact.save();
        res.status(201).send('Message successfully submitted!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting contact message');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
