import { Job } from 'bull';
import { importVehicleData } from '../services/importService';

export const importJob = async (job: Job) => {
  try {
    const { filePath } = job.data;
    console.log(`Processing import job for file: ${filePath}`);
    await importVehicleData(filePath);  // Call service to process file
    return { status: 'done', message: 'Data import completed successfully' };
  } catch (error) {
    console.error('Error processing import job:', error);
    throw error;
  }
};
