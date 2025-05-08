import "dotenv/config";
import { DataSource } from "typeorm";
import { Vehicle } from "../../../database-service/src/entity/Vehicle";
import path from "path";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.resolve(__dirname, '../../../database-service/src/entity/*.ts')],
  synchronize: true,
});
