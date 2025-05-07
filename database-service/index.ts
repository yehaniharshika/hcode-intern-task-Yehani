import { AppDataSource } from "./src/config/data-source";



AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    // You can now use AppDataSource.manager or AppDataSource.getRepository(Vehicle)
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
