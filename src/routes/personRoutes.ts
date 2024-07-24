// src/routes/pessoaRoutes.ts
import { Router } from 'express';
import { createPessoa, getPessoas, getPessoaById, updatePessoa, deletePessoa} from '../controllers/personController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/pessoas', authenticateToken,createPessoa);
router.get('/pessoas', authenticateToken,getPessoas);
router.get('/pessoas/:id', authenticateToken,getPessoaById);
router.put('/pessoas/:id', authenticateToken,updatePessoa);
router.delete('/pessoas/:id', authenticateToken,deletePessoa);

export default router;
