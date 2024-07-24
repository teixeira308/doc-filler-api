"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Person_1 = require("./entity/Person");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbPort = parseInt(process.env.DB_PORT || '3306', 10); // Define uma porta padrão, se não estiver definida
const dbHost = process.env.DB_HOST;
if (isNaN(dbPort)) {
    throw new Error('DB_PORT must be a valid number');
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    entities: [User_1.User, Person_1.Person],
    synchronize: true,
});
