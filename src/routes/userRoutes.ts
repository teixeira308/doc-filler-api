// src/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, getUsers, loginUser, updateUserStatus } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/status', authenticateToken, updateUserStatus);  // Rota para atualizar status do usuário

export default router;
