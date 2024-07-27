// src/controllers/templateController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Template } from '../entity/Template';
import { User } from '../entity/User';
import Logger from "../../src/config/logger";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

interface AuthenticatedRequest extends Request {
  user?: User;
}

// Configuração do Multer para salvar os arquivos no disco
const storage = multer.diskStorage({
    destination: function (req: AuthenticatedRequest, file, cb) {
        cb(null, 'uploads/'); // Diretório onde os arquivos serão salvos
    },
    filename: function (req: AuthenticatedRequest, file, cb) {
        
        const user = req.user;

        // Obter a data e hora atual
        const currentDateTime = new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..+/, '');
        
        // Obter o nome do arquivo original
        const originalFileName = file.originalname;

        // Gerar o nome do arquivo usando a data e hora atual, o ID do usuário e o nome do arquivo original
        const fileName = `${user?.id}-${currentDateTime}-${originalFileName}`;
        
        cb(null, fileName); // Nome do arquivo salvo
    }
});

const upload = multer({ storage: storage });

export const uploadSingleFile = upload.single('file');

// Cria template e faz upload de arquivo
export const createTemplate = async (req: AuthenticatedRequest, res: Response) => {
  const templateRepository = AppDataSource.getRepository(Template);
  const user = req.user; // Assumindo que o user está disponível em req.user

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'File is required' });
  }
  console.log(req.file.originalname)
  try {
    const filePath = path.join(__dirname, '../../uploads', req.file.filename);
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);
 
    const { descricao, nome } = req.body;
    const template = new Template();
    template.nome = req.file.filename;
    template.descricao = descricao;
    template.tamanho = req.file.size;
    template.tipo = req.file.originalname.split('.')[1]
    template.userId = user.id; // Defina o userId diretamente

    const savedTemplate = await templateRepository.save(template);
    
    Logger.info("Created template : " + JSON.stringify(savedTemplate));
    res.status(201).json(savedTemplate);
  } catch (error) {
    Logger.error('Error creating template', error);
    res.status(500).json({ message: 'Error creating template', error });
  }
};

// Obter todos os templates do usuário autenticado
export const getTemplates = async (req: AuthenticatedRequest, res: Response) => {
  const templateRepository = AppDataSource.getRepository(Template);
  const user = req.user; // Assumindo que o user está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const templates = await templateRepository.find({ where: { userId: user.id } });
    Logger.info("Search templates : " + JSON.stringify(templates));
    res.status(200).json(templates);
  } catch (error) {
    Logger.error('Error fetching templates', error);
    res.status(500).json({ message: 'Error fetching templates', error });
  }
};

// Obter template por ID
export const getTemplateById = async (req: AuthenticatedRequest, res: Response) => {
  const templateRepository = AppDataSource.getRepository(Template);
  const { id } = req.params;
  const user = req.user; // Assumindo que o userId está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const template = await templateRepository.findOne({
      where: { id: Number(id), userId: user.id }
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    Logger.info("Search template por ID : " + JSON.stringify(template));
    res.status(200).json(template);
  } catch (error) {
    Logger.error('Error fetching template', error);
    res.status(500).json({ message: 'Error fetching template', error });
  }
};

// Atualizar template
export const updateTemplate = async (req: AuthenticatedRequest, res: Response) => {
  const templateRepository = AppDataSource.getRepository(Template);
  const { id } = req.params;
  const { descricao } = req.body;
  const user = req.user; // Assumindo que o userId está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const template = await templateRepository.findOne({
      where: { id: Number(id), userId: user.id }
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    template.descricao = descricao;

    
    const updatedTemplate = await templateRepository.save(template);
    Logger.info("Update template : " + JSON.stringify(updatedTemplate));
    res.status(200).json(updatedTemplate);
  } catch (error) {
    Logger.error('Error updating template', error);
    res.status(500).json({ message: 'Error updating template', error });
  }
};

// Deletar template
export const deleteTemplate = async (req: AuthenticatedRequest, res: Response) => {
  const templateRepository = AppDataSource.getRepository(Template);
  const { id } = req.params;
  const user = req.user; // Assumindo que o userId está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const template = await templateRepository.findOne({
      where: { id: Number(id), userId: user.id } // Utilize userId para filtrar
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    await templateRepository.remove(template);
    Logger.info("Delete template : " + JSON.stringify(template));
    res.status(204).send();
  } catch (error) {
    Logger.error('Error deleting template', error);
    res.status(500).json({ message: 'Error deleting template', error });
  }
};