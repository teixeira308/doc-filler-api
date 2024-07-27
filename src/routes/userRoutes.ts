// src/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, getUsers, loginUser, updateUserStatus } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { userCreateValidation } from '../middleware/userValidation';
import { validate } from '../middleware/handleValidations';

const router = Router();

router.post('/register', userCreateValidation(),validate,createUser);
router.post('/login', loginUser);
router.put('/status', authenticateToken, updateUserStatus);  // Rota para atualizar status do usuário

export default router;
