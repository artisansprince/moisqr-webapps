// app.js
const express = require('express');
const authRoutes = require('./routes/adminAuthRoutes');

const app = express();
app.use(express.json());

app.use('/api/admin/', authRoutes);

module.exports = app;
