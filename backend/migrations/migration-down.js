// migrations/migration-down.js
const db = require('../config/db');

async function migrateDown() {
    try {
        await db.query('DROP TABLE IF EXISTS admins;');
        console.log('Migrasi down berhasil untuk tabel admins.');
    } catch (error) {
        console.error('Error saat migrasi down:', error);
    } finally {
        db.end();
    }
}

migrateDown();
