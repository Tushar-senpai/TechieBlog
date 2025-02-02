const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventsdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    location: String,
    eligibility: String,
    description: String
});

const Event = mongoose.model('Event', eventSchema);

// Route to handle form submission
app.post('/api/events', async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        await newEvent.save();
        res.status(201).json({ message: 'Event saved successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
