require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Message = require('./models/Message');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the current directory
app.use(express.static(__dirname));

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
app.post('/api/messages', async (req, res) => {
    try {
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

// Admin route to view all messages
app.get('/api/view-messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve index.html for any other route (SPA supporting)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
