import { Job } from 'bull';
import { exportVehicleData } from '../services/exportService';

export const exportJob = async (job: Job) => {
  try {
    const { exportCriteria } = job.data;
    console.log(`Processing export job for criteria: ${JSON.stringify(exportCriteria)}`);
    await exportVehicleData(exportCriteria);  // Call service to export data
    return { status: 'done', message: 'Data export completed successfully' };
  } catch (error) {
    console.error('Error processing export job:', error);
    throw error;
  }
};
