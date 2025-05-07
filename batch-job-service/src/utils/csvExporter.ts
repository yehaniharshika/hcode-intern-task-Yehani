import fs from 'fs';
import { Vehicle } from '../../../database-service/src/entity/Vehicle';

export const exportToCSV = (vehicles: Vehicle[], filePath: string) => {
  const headers = Object.keys(vehicles[0]).join(',');
  const rows = vehicles
    .map((v) => Object.values(v).join(','))
    .join('\n');
  const csvData = `${headers}\n${rows}`;
  fs.writeFileSync(filePath, csvData);
};
