import { Job } from "bull";
import { parseCSV } from "../utils/csvParser";
import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../../../database-service/src/entity/Vehicle";
import Redis from 'ioredis';

const redisClient = new Redis({ host: 'localhost', port: 6380 }); // Adjust host and port as needed

export const importJobProcessor = async (job: Job) => {
  console.log('📦 Processing import job...');
  const { filePath } = job.data;

  try {
    // Initialize DB if not done yet
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection initialized');
    }

    const records = await parseCSV(filePath);
    console.log(`📄 Parsed ${records.length} records`);

    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const vehicles = records.map((record) => {
      const manufacturedDate = new Date(record.manufactured_date);
      const age = new Date().getFullYear() - manufacturedDate.getFullYear();

      return vehicleRepository.create({
        first_name: record.first_name,
        last_name: record.last_name,
        email: record.email,
        car_make: record.car_make,
        car_model: record.car_model,
        vin: record.vin,
        manufactured_date: manufacturedDate,
        age_of_vehicle: age,
      });
    });

    await vehicleRepository.save(vehicles);
    console.log('✅ Vehicles saved successfully');

    // Set Redis key upon success
    redisClient.set('import-job-status', 'success', 'EX', 3600);  // Expires in 1 hour
    console.log("Redis job status set to success");
  } catch (err: any) {
    console.error('Error processing import job:', err.message);
    console.error(err.stack);
    
    // Set Redis key upon failure
    redisClient.set('import-job-status', 'failed', 'EX', 3600);  // Expires in 1 hour
    console.log("Redis job status set to failed");
  }
};
