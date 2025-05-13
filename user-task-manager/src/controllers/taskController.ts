import { Request, Response } from 'express';
import db from '../database';

// Controller to get tasks for a specific user
export const getTasks = (req: Request, res: Response): void => {
  const userId = req.params.id;
  db.all('SELECT * FROM tasks WHERE userId = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Controller to create a new task for a specific user
export const createTask = (req: Request, res: Response): void => {
  const userId = req.params.id;
  const { description } = req.body;

  if (!description) {
    res.status(400).json({ error: 'Description is required.' });
    return;
  }

  db.run('INSERT INTO tasks (description, userId) VALUES (?, ?)', [description, userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, description, userId });
    }
  });
};
