// api-service/src/config/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Vehicle],
  synchronize: true,  
});
