import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
  getStats
} from '../controllers/taskController.js';
import { validateTask } from '../middleware/validator.js';

const router = express.Router();

router.get('/stats', getStats);
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.patch('/:id/complete', toggleComplete);
router.delete('/:id', deleteTask);

export default router;

