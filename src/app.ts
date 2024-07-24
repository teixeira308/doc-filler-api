// src/index.ts
require("dotenv").config()
import 'reflect-metadata';

import { AppDataSource } from './data-source';
import express from 'express';
import userRoutes from './routes/userRoutes';
import personRoutes from './routes/personRoutes';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // ou swagger.yaml
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



AppDataSource.initialize()
  .then(() => {
    console.log('Connected to MySQL database');

    app.use('/v1/users', userRoutes);
    app.use('/v1/pessoas', personRoutes); 

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MySQL database', error);
    process.exit(1); // Encerrar o processo se não conseguir conectar ao banco de dados
  });
