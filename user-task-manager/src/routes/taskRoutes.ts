// taskRoutes.ts
import { Router } from 'express';
import { getTasks, createTask } from '../controllers/taskController';

const router = Router();

router.get('/users/:id/tasks', getTasks);
router.post('/users/:id/tasks', createTask);

export default router;
