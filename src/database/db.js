const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const db = new sqlite3.Database(
  path.resolve(__dirname, process.env.DB_PATH || 'database.sqlite'),
  (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to SQLite database.');
    }
  }
);

module.exports = db;
