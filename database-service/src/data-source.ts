import { DataSource } from "typeorm";
import { Vehicle } from "./entity/Vehicle";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root", 
    password: "1234",   
    database: "vehicle_db",
    synchronize: true,
    logging: false,
    entities: [Vehicle],
    migrations: [],
    subscribers: [],
  });