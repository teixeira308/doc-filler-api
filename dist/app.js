"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("dotenv").config();
require("reflect-metadata");
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
//swagger config
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // ou swagger.yaml
const app = (0, express_1.default)();
app.use(express_1.default.json());
//swagger endpoint config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Connected to MySQL database');
    app.use('/v1/users', userRoutes_1.default);
    app.use('/v1/pessoas', personRoutes_1.default);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((error) => {
    console.error('Error connecting to MySQL database', error);
    process.exit(1); // Encerrar o processo se não conseguir conectar ao banco de dados
});
