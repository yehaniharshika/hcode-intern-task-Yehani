// batch-job-service/src/queues/jobQueue.ts
import Queue from 'bull';

export const jobQueue = new Queue('import', {
  redis: {
    port: 6380, // Make sure this matches your Redis port
    host: '127.0.0.1',
  },
});
