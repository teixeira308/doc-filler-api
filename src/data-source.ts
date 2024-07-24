// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Person } from './entity/Person';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbPort = parseInt(process.env.DB_PORT || '3306', 10); // Define uma porta padrão, se não estiver definida
const dbHost = process.env.DB_HOST;

if (isNaN(dbPort)) {
  throw new Error('DB_PORT must be a valid number');
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: [User,Person],
  synchronize: true,
});
