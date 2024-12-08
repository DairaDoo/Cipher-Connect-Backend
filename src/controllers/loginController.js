const db = require('../database/db');
const { saveOtp } = require('./otpController');

// Generar OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000); // OTP de 6 dígitos

// Login con generación de OTP
const login = (username, password, callback) => {
  db.get('SELECT id, email, password FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return callback('Error finding user.');
    if (!row) return callback('User not found.');
    if (password !== row.password) return callback('Invalid credentials.');

    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutos

    // Llamamos a la función saveOtp para actualizar el OTP asociado con el usuario
    saveOtp(row.email, otp, expiresAt, (err) => {
      if (err) return callback(err);
      return callback(null, { message: 'OTP generated successfully.', email: row.email });
    });
  });
};

// Verificar OTP
const verifyOtp = (username, password, otp, callback) => {
  // Verificar si las credenciales son correctas
  db.get('SELECT id, email FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) return callback('Error finding user.');
    if (!row) return callback('User not found.');
    if (password !== row.password) return callback('Invalid credentials.');

    // Verificar OTP
    db.get(
      'SELECT otp, expires_at FROM otps WHERE user_id = ?',
      [row.id],
      (err, otpRow) => {
        if (err) return callback('Error retrieving OTP.');
        if (!otpRow) return callback('OTP not found.');
        if (otpRow.otp !== otp) return callback('Invalid OTP.');
        if (Date.now() > otpRow.expires_at) return callback('OTP expired.');

        return callback(null, 'OTP verified successfully. Access granted.');
      }
    );
  });
};

module.exports = { login, verifyOtp };
