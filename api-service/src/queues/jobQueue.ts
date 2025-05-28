import Queue from 'bull';

export const jobQueue = new Queue('import', {
  redis: {
    host: '127.0.0.1',
    port: 6380, 
  },
});
