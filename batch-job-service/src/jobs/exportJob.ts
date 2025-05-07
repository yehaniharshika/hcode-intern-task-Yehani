import { Job } from 'bull';
import { AppDataSource } from '../config/data-source';
import { Vehicle } from '../../../database-service/src/entity/Vehicle';
import { stringify } from 'csv-stringify';
import fs from 'fs/promises';
import path from 'path';
import { MoreThan } from 'typeorm'; // ✅ Added import

export const exportVehicles = async (minimumAge: number): Promise<string> => {
  const vehicleRepo = AppDataSource.getRepository(Vehicle);

  // ✅ Correct filtering using MoreThan operator
  const vehicles = await vehicleRepo.find({
    where: { age_of_vehicle: MoreThan(minimumAge) },
  });

  const csvRecords = vehicles.map((v) => ({
    first_name: v.first_name,
    last_name: v.last_name,
    email: v.email,
    car_make: v.car_make,
    car_model: v.car_model,
    vin: v.vin,
    manufactured_date: v.manufactured_date.toISOString().split('T')[0],
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
  const { minimumAge } = job.data;
  const outputPath = await exportVehicles(minimumAge);
  console.log(`✅ Vehicles exported to ${outputPath}`);
};
