const express = require('express');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otpRoutes');
const dbInit = require('./database/init'); // Asegura que las tablas estén creadas

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json())

app.use(bodyParser.json());
app.use('/api', otpRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
