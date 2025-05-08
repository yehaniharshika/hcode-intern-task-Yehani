import { exportJobProcessor } from './src/jobs/exportJob';
import { importJobProcessor } from './src/jobs/importJob';
import { jobQueue } from './src/queues/jobQueue';

jobQueue.process('import', importJobProcessor);
jobQueue.process('export', exportJobProcessor);

console.log('🚀 Worker started and listening for jobs...');
