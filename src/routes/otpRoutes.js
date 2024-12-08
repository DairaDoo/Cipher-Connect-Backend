const express = require('express');
const { login, verifyOtp } = require('../controllers/loginController');

const router = express.Router();

// Ruta de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  login(username, password, (err, data) => {
    if (err) return res.status(400).json({ error: err });
    return res.json(data); // Devuelve mensaje y correo al que se envió el OTP
  });
});

// Ruta para verificar OTP
router.post('/verify-otp', (req, res) => {
  const { username, password, otp } = req.body;

  verifyOtp(username, password, otp, (err, message) => {
    if (err) return res.status(400).json({ error: err });
    return res.json({ message }); // Autenticación exitosa
  });
});

module.exports = router;
