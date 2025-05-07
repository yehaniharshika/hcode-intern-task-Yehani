import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',   // 🔁 replace with your MySQL username
  password: '1234',   // 🔁 replace with your MySQL password
  database: 'vehicledatadb',    // 🔁 replace with your database name
  synchronize: true,                 // set to false in production
  logging: false,
  entities: [Vehicle],
  migrations: [
    "src/migration/**/*.ts",  // Path to migration files
  ],
  subscribers: [
    "src/subscriber/**/*.ts",  // Path to subscriber files
  ],
});
