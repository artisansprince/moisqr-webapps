// app.js
const express = require('express');
const authRoutes = require('./routes/admin/adminAuthRoutes');
const categoryRoutes = require('./routes/admin/adminCategoryRoutes');
const objectRoutes = require('./routes/admin/adminObjectRoutes');

const app = express();
app.use(express.json());

app.use('/api/admin', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/objects', objectRoutes);

module.exports = app;
