import { Job } from 'bull';
import { stringify } from 'csv-stringify';
import fs from 'fs/promises';
import path from 'path';
import { MoreThan } from 'typeorm';

import { AppDataSource } from '../config/data-source';
import Redis from 'ioredis';

let Vehicle: any; // Lazy load after datasource init
const redisClient = new Redis({ host: 'localhost', port: 6380 });

export const exportVehicles = async (minimumAge: number): Promise<string> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  if (!Vehicle) {
    // Dynamically import the compiled Vehicle entity from dist
    Vehicle = (await import('../../../database-service/src/entity/Vehicle')).Vehicle;
  }

  const vehicleRepo = AppDataSource.getRepository(Vehicle);

  const vehicles = await vehicleRepo.find({
    where: { age_of_vehicle: MoreThan(minimumAge) },
  });

  if (vehicles.length === 0) {
    console.log(`❌ No vehicles found for age > ${minimumAge}`);
    return 'No data to export';
  }

  const csvRecords = vehicles.map((v: any) => ({
    first_name: v.first_name,
    last_name: v.last_name,
    email: v.email,
    car_make: v.car_make,
    car_model: v.car_model,
    vin: v.vin,
    manufactured_date: v.manufactured_date,
    age_of_vehicle: v.age_of_vehicle,
  }));
  

  const outputPath = path.join(__dirname, `../../exports/vehicles_age_${minimumAge}.csv`);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const csvData = await new Promise<string>((resolve, reject) => {
    stringify(csvRecords, { header: true }, (err, output) => {
      if (err) reject(err);
      else resolve(output);
    });
  });

  await fs.writeFile(outputPath, csvData);
  return outputPath;
};

export const exportJobProcessor = async (job: Job) => {
  try {
    const { age } = job.data;
    console.log(`📦 Processing export job for age > ${age}`);

    const filePath = await exportVehicles(age);
    await redisClient.set(`vehicle_export_result:${job.id}`, filePath);

    console.log(`✅ Export complete. File saved at ${filePath}`);
  } catch (error) {
    console.error(`❌ Export job failed:`, error);
  }
};
