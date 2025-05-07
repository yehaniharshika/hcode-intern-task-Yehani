// batch-job-service/src/jobs/importJob.ts
import { Job } from 'bull';
import { parseCSV } from '../utils/csvParser';
import { AppDataSource } from '../config/data-source';
import { Vehicle } from '../../../database-service/src/entity/Vehicle';

export const importJobProcessor = async (job: Job) => {
  const { filePath } = job.data;
  const records = await parseCSV(filePath);
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
};
