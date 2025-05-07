import 'reflect-metadata';

import { jobQueue } from '../api-service/src/queues/jobQueue';
import { importJobProcessor } from './src/jobs/importJob';
import { exportJobProcessor } from './src/jobs/exportJob';
import { AppDataSource } from '../database-service/src/config/data-source';

const start = async () => {
  try {
    // Connect to the database
    await AppDataSource.initialize();
    console.log('✅ Database connected (Batch Job Service)');

    // Register job processors
    jobQueue.process('import', importJobProcessor);
    jobQueue.process('export', exportJobProcessor);

    console.log('🚀 Job processors are running...');
  } catch (error) {
    console.error('❌ Error starting batch job service:', error);
  }
};

start();
