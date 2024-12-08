const db = require('../database/db');

// Guardar o actualizar OTP
const saveOtp = (email, otp, expiresAt, callback) => {
  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return callback('Error finding user.');
    if (!row) return callback('User not found.');

    const userId = row.id;

    // Usar INSERT OR REPLACE para actualizar el OTP si ya existe para el usuario
    db.run(
      `INSERT OR REPLACE INTO otps (user_id, otp, expires_at) VALUES (?, ?, ?)`,
      [userId, otp, expiresAt],
      (err) => {
        if (err) return callback(`Error saving OTP: ${err.message}`);
        return callback(null);
      }
    );
  });
};

module.exports = { saveOtp };
