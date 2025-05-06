import Queue from 'bull';
import { exportJob } from '../jobs/exportJob';

// Create a queue for export jobs
const exportQueue = new Queue('export-queue', {
  redis: { host: 'localhost', port: 6379 },  // Use your Redis configuration
});

// Add job to queue
export const addExportJob = async (exportCriteria: object) => {
  await exportQueue.add({ exportCriteria });
};

// Process the export job
exportQueue.process(exportJob);

export default exportQueue;
