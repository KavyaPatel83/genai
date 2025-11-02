const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB Connection (optional - will work without MongoDB for now)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-builder';

if (MONGODB_URI && !MONGODB_URI.includes('localhost')) {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.log('Using in-memory storage (MongoDB not configured)');
}

// Import routes
const resumeRoutes = require('./routes/resumeRoutes');
const coverLetterRoutes = require('./routes/coverLetterRoutes');
const authRoutes = require('./routes/authRoutes');

// API Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/cover-letters', coverLetterRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'AI Resume Generator API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Serve frontend for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 MongoDB URL: ${MONGODB_URI}`);
    console.log(`🌐 Frontend served from: ${path.join(__dirname, 'frontend')}`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});
