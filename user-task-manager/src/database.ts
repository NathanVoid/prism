import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Database opened successfully.");
  }
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, userId INTEGER, FOREIGN KEY(userId) REFERENCES users(id))');
});

export default db;