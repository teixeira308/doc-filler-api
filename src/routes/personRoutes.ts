// src/routes/pessoaRoutes.ts
import { Router } from 'express';
import { createPessoa, getPessoas, getPessoaById, updatePessoa, deletePessoa } from '../controllers/personController';
import { authenticateToken } from '../middleware/auth';
import { personCreateValidation } from '../middleware/personValidation';
import { validate } from '../middleware/handleValidations';

const router = Router();

router.post('/', personCreateValidation(),validate,authenticateToken, createPessoa);
router.get('/', authenticateToken, getPessoas);
router.get('/:id', authenticateToken, getPessoaById);
router.put('/:id', authenticateToken, updatePessoa);
router.delete('/:id', authenticateToken, deletePessoa);

export default router;
