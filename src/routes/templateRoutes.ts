// src/routes/templateRoutes.ts
import { Router } from 'express';
import { createTemplate, getTemplates, getTemplateById, updateTemplate, deleteTemplate ,uploadSingleFile} from '../controllers/templateController';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth';



const router = Router();

router.post('/', authenticateToken, uploadSingleFile,createTemplate);
router.get('/',authenticateToken, getTemplates);
router.get('/:id', authenticateToken,getTemplateById);
router.put('/:id', authenticateToken,updateTemplate);
router.delete('/:id', authenticateToken,deleteTemplate);

export default router;
