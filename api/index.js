const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables.');
} else {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('✅ Connected to MongoDB'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
}

// Routes
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        mongodb: MONGODB_URI ? 'configured' : 'missing',
        time: new Date().toISOString(),
        environment: 'Zero-Config'
    });
});

app.post('/api/messages', async (req, res) => {
    try {
        if (!MONGODB_URI) {
            return res.status(500).json({ success: false, error: 'Database not configured on server' });
        }
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Please provide name, email and message' });
        }

        const newMessage = new Message({
            name,
            email,
            message
        });

        await newMessage.save();
        
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/view-messages', async (req, res) => {
    try {
        if (!MONGODB_URI) throw new Error('Database not configured');
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// For Vercel, we export the app
module.exports = app;
