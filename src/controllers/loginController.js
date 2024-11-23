const db = require('../database/db');
const { saveOtp } = require('../controllers/otpController'); // Importamos solo la función saveOtp

// Verificar si el username y la contraseña son correctos
const login = (username, password, callback) => {
  console.log('Buscando usuario con username:', username); // Esto debería mostrarte el nombre de usuario en la consola
  
  db.get('SELECT id, email, password FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return callback('Error finding user.');
    if (!row) return callback('User not found.'); // Si el usuario no se encuentra, devolvemos un error

    console.log('Usuario encontrado:', row); // Verifica que esta línea esté siendo ejecutada

    if (password !== row.password) return callback('Invalid credentials.'); // Compara la contraseña

    // Continuar con el OTP si la contraseña es correcta
    const otp = Math.floor(100000 + Math.random() * 900000); // OTP de 6 dígitos
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutos

    // Guardar OTP
    saveOtp(row.email, otp, expiresAt, (err, message) => {
      if (err) return callback(err);
      return callback(null, 'OTP generated successfully. Please check your email.');
    });
  });
};

module.exports = { login };
