import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',   
  password: '1234',
  database: 'vehicledatadb', 
  synchronize: true, 
  logging: false,
  entities: [Vehicle],
  migrations: [
    "src/migration/**/*.ts",  // Path to migration files
  ],
  subscribers: [
    "src/subscriber/**/*.ts",  // Path to subscriber files
  ],
});
