const express = require('express');
const bodyParser = require('body-parser');
const otpRoutes = require('./src/routes/otpRoutes');
const dbInit = require('./src/database/init'); // Importa la función de inicialización

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa la base de datos
dbInit();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', otpRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
