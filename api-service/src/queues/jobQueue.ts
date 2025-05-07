// api-service/src/queues/jobQueue.ts
import Bull from 'bull';
import 'dotenv/config';

export const jobQueue = new Bull('vehicle-job-queue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});
