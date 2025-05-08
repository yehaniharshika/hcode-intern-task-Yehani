import { AppDataSource } from "./src/config/data-source";
import { Vehicle } from "./src/entity/Vehicle";



AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    // You can now use AppDataSource.manager or AppDataSource.getRepository(Vehicle)
    AppDataSource.getRepository(Vehicle)
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
