import { ConnectionOptions } from 'typeorm';
import { Vehicle } from '../database-service/src/entity/Vehicle';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'vehicledatadb',
  entities: [Vehicle],
  synchronize: true,
};

export default config;
