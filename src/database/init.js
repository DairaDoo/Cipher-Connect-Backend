// Asegúrate de que `db` esté correctamente importado desde el archivo donde se inicializa la base de datos
const db = require('./db'); // Asegúrate de que la ruta sea correcta

// Función para inicializar las tablas
const dbInit = () => {
  db.serialize(() => {
    // Crear tabla `users`
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) console.error('Error creating users table:', err.message);
      }
    );

    // Crear tabla `otps`
    db.run(
      `CREATE TABLE IF NOT EXISTS otps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        otp TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) console.error('Error creating otps table:', err.message);
      }
    );
  });
};

module.exports = dbInit;
