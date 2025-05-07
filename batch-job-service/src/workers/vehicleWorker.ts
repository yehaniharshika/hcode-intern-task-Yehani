// batch-job-service/src/workers/vehicleWorker.ts
import Bull from 'bull';
import 'dotenv/config';
import { importJobProcessor } from '../jobs/importJob';
import { exportJobProcessor } from '../jobs/exportJob';

const jobQueue = new Bull('vehicle-job-queue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

jobQueue.process('import', async (job) => {
  console.log('🎯 Running import job...', job.data);
  await importJobProcessor(job);
});

jobQueue.process('export', async (job) => {
  console.log('🎯 Running export job...', job.data);
  await exportJobProcessor(job);
});