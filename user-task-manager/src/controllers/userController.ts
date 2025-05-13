import { Request, Response } from 'express';
import db from '../database';

// Controller to fetch all users
export const getUsers = (req: Request, res: Response): void => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Controller to create a new user
export const createUser = (req: Request, res: Response): void => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required." });
    return;
  }

  db.run('INSERT INTO users (name) VALUES (?)', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name });
    }
  });
};
