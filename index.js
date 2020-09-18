const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

// Configuration to load data from .env
dotenv.config();

// Cnnect to db
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true }, () => console.log('MongoDB Connected'));

// Middlewares
app.use(express.json()); // Enable body parser
app.use('/api/user', require('./routes/auth')); // Auth routes middleware
app.use('/api/post', require('./routes/post')); // Posts routes middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
