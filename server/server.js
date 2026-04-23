require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/items'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
} else {
  // In development, handle /dashboard and other frontend routes by telling the user to use the frontend port
  // or redirect them if we can detect the host. 
  // For now, let's just add a simple message or a redirect if they hit a frontend route on the backend port.
  app.get(['/', '/dashboard', '/login', '/register'], (req, res) => {
    res.send(`
      <div style="background: #05121e; color: #00ffff; height: 100vh; display: flex; flex-direction: column; justify-content: center; alignItems: center; font-family: monospace;">
        <h1>BACKEND_ONLY_MODE</h1>
        <p>You are accessing the backend port (5000).</p>
        <p>Please use the frontend development server at: <a href="http://localhost:5173" style="color: #fff;">http://localhost:5173</a></p>
      </div>
    `);
  });
}

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lost-found';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
