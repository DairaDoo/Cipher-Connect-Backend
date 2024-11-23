const db = require('../database/db');

// Guardar o actualizar OTP
const saveOtp = (email, otp, expiresAt, callback) => {
  db.get(
    'SELECT id FROM users WHERE email = ?',
    [email],
    (err, row) => {
      if (err) {
        console.error('Error finding user:', err);
        return callback('Error finding user.');
      }
      if (!row) {
        console.error('User not found with email:', email);
        return callback('User not found.');
      }

      const userId = row.id;

      db.run(
        `INSERT INTO otps (user_id, otp, expires_at) 
         VALUES (?, ?, ?) 
         ON CONFLICT(user_id) DO UPDATE SET otp = ?, expires_at = ?`,
        [userId, otp, expiresAt, otp, expiresAt],
        (err) => {
          if (err) {
            console.error('Error saving OTP:', err);
            return callback('Error saving OTP.');
          }
          return callback(null, 'OTP saved successfully.');
        }
      );
    }
  );
};

module.exports = { saveOtp };
