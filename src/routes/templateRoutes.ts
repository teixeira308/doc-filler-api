// src/routes/templateRoutes.ts
import { Router } from 'express';
import { createTemplate, getTemplates, getTemplateById, updateTemplate, deleteTemplate ,uploadSingleFile,downloadTemplateById ,createFilledFile} from '../controllers/templateController';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth';




const router = Router();

router.post('/', authenticateToken,uploadSingleFile,createTemplate);
router.get('/',authenticateToken, getTemplates);
router.get('/:id', authenticateToken,getTemplateById);
router.get('/:id/download', authenticateToken,downloadTemplateById);
router.get('/:idtemplate/person/:idpessoa/filled', authenticateToken,createFilledFile);
router.put('/:id', authenticateToken,updateTemplate);
router.delete('/:id', authenticateToken,deleteTemplate);

export default router;
