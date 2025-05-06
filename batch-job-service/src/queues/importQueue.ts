import Queue from 'bull';
import { importJob } from '../jobs/importJob';

// Create a queue for import jobs
const importQueue = new Queue('import-queue', {
  redis: { host: 'localhost', port: 6379 },  // Use your Redis configuration
});

// Add job to queue
export const addImportJob = async (filePath: string) => {
  await importQueue.add({ filePath });
};

// Process the import job
importQueue.process(importJob);

export default importQueue;
