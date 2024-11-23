const express = require('express');
const { saveOtp, verifyOtp, deleteOtp } = require('../controllers/otpController');
const { login } = require('../controllers/loginController');

const router = express.Router();

// Ruta de login
router.post('/login', (req, res) => {
  console.log('Request body:', req.body); // Verifica qué datos estás recibiendo en el servidor
  const { username, password } = req.body;
  console.log('Received login request:', username, password);

  login(username, password, (err, message) => {
    if (err) return res.status(400).json({ error: err });
    return res.json({ message });
  });
});
  

// Ruta para guardar el OTP
router.post('/otp/save', (req, res) => {
  const { email, otp, expiresAt } = req.body;

  saveOtp(email, otp, expiresAt, (err, message) => {
    if (err) return res.status(400).json({ error: err });
    return res.json({ message });
  });
});

// Ruta para verificar el OTP
router.post('/otp/verify', (req, res) => {
  const { email, otp } = req.body;

  verifyOtp(email, otp, (err, message) => {
    if (err) return res.status(400).json({ error: err });
    return res.json({ message });
  });
});

// Ruta para eliminar el OTP
router.delete('/otp/delete', (req, res) => {
  const { email } = req.body;

  deleteOtp(email, (err, message) => {
    if (err) return res.status(400).json({ error: err });
    return res.json({ message });
  });
});

module.exports = router;
