import { addImportJob } from './src/queues/importQueue';
import { addExportJob } from './src/queues/exportQueue';

// Start the service
console.log('Batch Job Service started');

// Example of adding an import job
addImportJob('path_to_your_data.csv').then(() => {
  console.log('Import job added to queue');
});

// Example of adding an export job
addExportJob({ age_of_vehicle: { $gt: 5 } }).then(() => {
  console.log('Export job added to queue');
});
