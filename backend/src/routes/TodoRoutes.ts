import { Router } from 'express';
import { createNewTask,getTasks,completedTask,deleteTask,editTask } from '../controllers/TodoController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const TodoRoutes = Router();


TodoRoutes.post('/',authMiddleware, createNewTask);
TodoRoutes.get('/',authMiddleware, getTasks);
TodoRoutes.post('/completed',authMiddleware, completedTask);
TodoRoutes.delete('/',authMiddleware, deleteTask);
TodoRoutes.put('/',authMiddleware, editTask);

export default TodoRoutes;