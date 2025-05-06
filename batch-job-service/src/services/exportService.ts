import fs from 'fs';


export const exportVehicleData = async (exportCriteria: object) => {
  try {
    const vehicles = await Vehicle.find({
      where: exportCriteria,
    });

    const csvData = convertToCSV(vehicles);
    fs.writeFileSync('exported_data.csv', csvData);
    console.log('Data exported to exported_data.csv');
  } catch (error) {
    console.error('Error exporting vehicle data:', error);
    throw error;
  }
};

// Helper function to convert data to CSV format
const convertToCSV = (data: object[]) => {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map((row: any) => Object.values(row).join(','));
  return [header, ...rows].join('\n');
};
