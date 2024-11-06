// app.js
const express = require('express');
const authRoutes = require('./routes/adminAuthRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const objectRoutes = require('./routes/objectRoutes');

const app = express();
app.use(express.json());

app.use('/api/admin', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/objects', objectRoutes);

module.exports = app;
