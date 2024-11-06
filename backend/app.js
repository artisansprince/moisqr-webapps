// app.js
const express = require('express');
const authRoutes = require('./routes/admin/adminAuthRoutes');
const categoryRoutes = require('./routes/admin/adminCategoryRoutes');
const objectRoutes = require('./routes/admin/adminObjectRoutes');
const publicObjectRoutes = require('./routes/public/publicObjectRoutes');

const app = express();
app.use(express.json());

// Menambahkan routes untuk admin
app.use('/api/admin', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/objects', objectRoutes);

// Menambahkan routes untuk public
app.use('/api/public', publicObjectRoutes);

module.exports = app;
