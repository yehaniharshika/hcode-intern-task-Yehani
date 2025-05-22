import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Vehicle } from '../entity/Vehicle';

// Load .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Vehicle],
  migrations: [
    "src/migration/**/*.ts",
  ],
  subscribers: [
    "src/subscriber/**/*.ts",
  ],
});
