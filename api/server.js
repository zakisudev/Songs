require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/db');
const songRoutes = require('./routes/song.routes');
const statRoutes = require('./routes/stat.routes');

// Connect to MongoDB
connectDB();
// Create an Express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the Express app to handle data parsing
app.use('/api/songs', songRoutes);
app.use('/api/stats', statRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
