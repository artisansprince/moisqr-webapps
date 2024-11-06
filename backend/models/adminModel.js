// models/adminModel.js
const db = require('../config/db');

async function findAdminByEmail(email) {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
}

module.exports = { findAdminByEmail };
