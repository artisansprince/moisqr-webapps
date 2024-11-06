const db = require('../config/db');

exports.create = async (name, description, image_url, location) => {
    const [result] = await db.query(
        'INSERT INTO objects (name, description, image_url, location) VALUES (?, ?, ?, ?)',
        [name, description, image_url, location]
    );
    return result.insertId;
};

exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM objects');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM objects WHERE id = ?', [id]);
    return rows[0];
};

exports.update = async (id, name, description, image_url, location) => {
    await db.query(
        'UPDATE objects SET name = ?, description = ?, image_url = ?, location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, description, image_url, location, id]
    );
};

exports.delete = async (id) => {
    await db.query('DELETE FROM objects WHERE id = ?', [id]);
};
