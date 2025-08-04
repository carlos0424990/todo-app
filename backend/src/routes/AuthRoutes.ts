import { Router } from 'express';
import { registerUser,loginUser } from '../controllers/AuthController';

const AuthRoutes = Router();


AuthRoutes.post('/register', registerUser);
AuthRoutes.post('/login', loginUser);

export default AuthRoutes;